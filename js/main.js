async function runDiagnosis() {
  const input = document.getElementById("userInput").value.trim();
  const output = document.getElementById("gptResponse");

  if (!input) {
    output.innerText = "진단을 위해 정보를 입력해주세요.";
    return;
  }

  output.innerText = "AI 분석 중입니다. 잠시만 기다려주세요...";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "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",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4", // or gpt-3.5-turbo
      messages: [
        {
          role: "system",
          content: `너는 창업 전문가이자 데이터 분석가 AI야.
사용자가 제공한 정보를 바탕으로 사업 가능성을 진단하고, 
시장 상황, 지역, 업종 등을 고려하여 월 예상 매출을 한국 원화로 추정해줘.
답변은 현실적이고 논리적이되, 친절한 톤으로 작성해줘.`,
        },
        {
          role: "user",
          content: `다음은 창업 정보야:\n${input}\n이 정보를 바탕으로 사업 진단과 예상 월매출을 알려줘.`,
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
}
