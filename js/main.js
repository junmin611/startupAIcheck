async function runDiagnosis() {
  const input = document.getElementById("userInput").value.trim();
  const output = document.getElementById("gptResponse");

  if (!input) {
    output.innerText = "진단을 위해 정보를 입력해주세요.";
    return;
  }

  output.innerText = "AI 분석 중입니다. 잠시만 기다려주세요...";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4", // 또는 "gpt-3.5-turbo"
        messages: [
          {
            role: "system",
            content: `당신은 창업 컨설턴트 AI입니다. 사용자가 입력한 창업 아이디어를 분석하여
시장 가능성, 경쟁력, 지역 특성 등을 고려한 분석과 함께 예상 월매출(범위 포함)을 제시하세요.
답변은 현실적이고 한국어로 정중하게 해주세요.`,
          },
          {
            role: "user",
            content: `창업 정보:\n${input}\n이 정보를 바탕으로 진단 및 예상 월매출을 알려줘.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1200,
      }),
    });

    const data = await response.json();

    if (data.error) {
      output.innerText = "❌ 오류 발생: " + data.error.message;
    } else {
      const reply = data.choices?.[0]?.message?.content?.trim();
      output.innerText = reply || "AI로부터 응답을 받지 못했습니다.";
    }
  } catch (err) {
    output.innerText = "❌ 네트워크 오류 또는 API 호출 실패: " + err.message;
  }
}
