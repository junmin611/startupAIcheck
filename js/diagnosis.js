// 자가진단 기능 구현
document.addEventListener('DOMContentLoaded', function() {
    // 질문 목록
    const questions = [
        "현재 스타트업의 주요 비즈니스 모델은 무엇인가요?",
        "현재 월 매출은 얼마인가요?",
        "주요 고객층은 어떻게 되나요?",
        "현재 가장 큰 비즈니스 과제는 무엇인가요?",
        "마케팅에 월 얼마를 투자하고 계신가요?"
    ];
    
    // 변수 초기화
    let currentStep = 0;
    let answers = {};
    
    // DOM 요소
    const modal = document.getElementById('diagnosisModal');
    const closeModal = document.getElementById('closeModal');
    const startDiagnosis = document.getElementById('startDiagnosis');
    const questionContainer = document.getElementById('questionContainer');
    const resultContainer = document.getElementById('resultContainer');
    const questionTitle = document.getElementById('questionTitle');
    const currentQuestion = document.getElementById('currentQuestion');
    const answerInput = document.getElementById('answerInput');
    const nextQuestion = document.getElementById('nextQuestion');
    const estimatedRevenue = document.getElementById('estimatedRevenue');
    const basicAnalysis = document.getElementById('basicAnalysis');
    const showPayment = document.getElementById('showPayment');
    const paymentForm = document.getElementById('paymentForm');
    const processPayment = document.getElementById('processPayment');
    
    // 자가진단 시작
    startDiagnosis.addEventListener('click', function() {
        modal.style.display = 'block';
        currentStep = 0;
        answers = {};
        showQuestion();
        questionContainer.style.display = 'block';
        resultContainer.style.display = 'none';
        paymentForm.style.display = 'none';
    });
    
    // 모달 닫기
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // 외부 클릭 시 모달 닫기
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // 질문 표시
    function showQuestion() {
        questionTitle.textContent = `스타트업 자가진단 (${currentStep + 1}/${questions.length})`;
        currentQuestion.textContent = questions[currentStep];
        answerInput.value = answers[currentStep] || '';
    }
    
    // 다음 질문으로 이동
    nextQuestion.addEventListener('click', function() {
        const answer = answerInput.value.trim();
        if (answer === '') {
            alert('답변을 입력해주세요.');
            return;
        }
        
        // 답변 저장
        answers[currentStep] = answer;
        
        if (currentStep < questions.length - 1) {
            // 다음 질문으로
            currentStep++;
            showQuestion();
        } else {
            // 모든 질문 완료, 결과 분석
            analyzeDiagnosis();
        }
    });
    
    // 결과 분석
    function analyzeDiagnosis() {
        // 실제로는 서버에 API 요청을 보내야 하지만, 
        // 여기서는 간단한 예시로 대체합니다.
        
        // 매출 문자열에서 숫자만 추출하는 함수
        function extractNumber(str) {
            const numbers = str.match(/\d+/g);
            if (numbers) {
                return parseInt(numbers.join(''));
            }
            return 0;
        }
        
        // 답변 분석
        let revenueEstimate = '약 500만원 ~ 800만원';
        let analysisText = '현재 비즈니스 모델은 잠재력이 있으나 고객 타겟팅 전략 개선이 필요합니다.';
        
        // 비즈니스 모델 분석
        const businessModel = answers[0].toLowerCase();
        const currentRevenue = extractNumber(answers[1]);
        const customerBase = answers[2].toLowerCase();
        const challenges = answers[3].toLowerCase();
        const marketingBudget = extractNumber(answers[4]);
        
        // 매출 추정 로직 (간단한 예시)
        if (currentRevenue > 0) {
            if (currentRevenue < 1000000) {
                revenueEstimate = '약 300만원 ~ 500만원';
            } else if (currentRevenue < 5000000) {
                revenueEstimate = '약 800만원 ~ 1,200만원';
            } else if (currentRevenue < 10000000) {
                revenueEstimate = '약 1,500만원 ~ 2,000만원';
            } else {
                revenueEstimate = '약 2,500만원 이상';
            }
        }
        
        // 기본 분석 로직 (간단한 예시)
        if (businessModel.includes('서비스') || businessModel.includes('service')) {
            if (marketingBudget < 500000) {
                analysisText = '서비스 기반 비즈니스 모델은 잠재력
