import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, artistName, lyrics, blankText, fullLine } = req.body ?? {};

  if (!title || !blankText || !fullLine) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const client = new Anthropic({ apiKey });
  const lyricsContext = Array.isArray(lyrics) ? lyrics.join('\n') : String(lyrics ?? '');

  const prompt = `당신은 K-POP 가사 퀴즈 문제를 만드는 전문가입니다.

아티스트: ${artistName}
곡 제목: ${title}

가사:
${lyricsContext}

빈칸의 정답: "${blankText}"
정답이 포함된 완성 라인: "${fullLine}"

위 정보를 바탕으로 퀴즈 오답을 3개 만들어주세요.

조건:
- 정답 "${blankText}"과 헷갈리기 쉬워야 합니다 (발음·글자 수·의미 중 하나 이상 유사)
- 명확히 틀린 답이어야 합니다
- 정답과 비슷한 길이여야 합니다
- 정답이 한국어면 한국어로, 영어면 영어로 작성하세요

JSON 형식으로만 응답하세요 (다른 텍스트 없이):
{"choices":["오답1","오답2","오답3"]}`;

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 150,
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = message.content[0]?.text?.trim() ?? '';

    // 응답에서 JSON 부분만 추출 (```json ... ``` 감싸인 경우 대비)
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');

    const parsed = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(parsed.choices) || parsed.choices.length < 3) {
      throw new Error('Invalid choices array');
    }

    return res.status(200).json({ choices: parsed.choices.slice(0, 3) });
  } catch (err) {
    console.error('[generate-choices] error:', err.message);
    return res.status(500).json({ error: 'Failed to generate choices' });
  }
}
