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
if (startDiagnosis) {
    startDiagnosis.addEventListener('click', function() {
        modal.style.display = 'block';
        currentStep = 0;
        answers = {};
        showQuestion();
        questionContainer.style.display = 'block';
        resultContainer.style.display = 'none';
        if (paymentForm) paymentForm.style.display = 'none';
    });
}

// 모달 닫기
if (closeModal) {
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
}

// 외부 클릭 시 모달 닫기
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// 질문 표시
function showQuestion() {
    if (questionTitle && currentQuestion) {
        questionTitle.textContent = `스타트업 자가진단 (${currentStep + 1}/${questions.length})`;
        currentQuestion.textContent = questions[currentStep];
        answerInput.value = answers[currentStep] || '';
    }
}

// 다음 질문으로 이동
if (nextQuestion) {
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
}

// 결과 분석
function analyzeDiagnosis() {
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
    
    // 매출 추정 로직
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
    
    // 기본 분석 로직
    if (businessModel.includes('서비스') || businessModel.includes('service')) {
        if (marketingBudget < 500000) {
            analysisText = '서비스 기반 비즈니스 모델은 잠재력이 있으나, 마케팅 예산이 낮아 고객 확보에 어려움이 있을 수 있습니다. 타겟 고객층을 명확히 하고 마케팅 효율성을 높이는 전략이 필요합니다.';
        } else {
            analysisText = '서비스 기반 비즈니스 모델과 적절한 마케팅 예산을 갖추고 있습니다. 고객 경험 최적화와 서비스 차별화 전략을 통해 더 높은 성장이 가능합니다.';
        }
    } else if (businessModel.includes('제품') || businessModel.includes('product')) {
        if (marketingBudget < 1000000) {
            analysisText = '제품 기반 비즈니스는 초기 마케팅과 브랜딩이 중요합니다. 현재 마케팅 예산이 낮은 편으로, 제품 인지도를 높이기 위한 전략적 투자가 필요합니다.';
        } else {
            analysisText = '제품 기반 비즈니스와 적절한 마케팅 예산을 갖추고 있습니다. 제품 라인업 확장과 유통 채널 다각화를 통해 매출 증대가 가능합니다.';
        }
    }
    
    if (challenges.includes('자금') || challenges.includes('투자') || challenges.includes('funding')) {
        analysisText += ' 자금 조달 이슈를 해결하기 위해 투자 유치 전략과 비용 효율적인 운영 방안을 검토해야 합니다.';
    } else if (challenges.includes('고객') || challenges.includes('사용자') || challenges.includes('customer')) {
        analysisText += ' 고객 확보 및 유지 전략을 강화하고, 고객 피드백을 적극 반영한 제품/서비스 개선이 필요합니다.';
    }
    
    // 결과 표시
    if (estimatedRevenue && basicAnalysis) {
        estimatedRevenue.textContent = revenueEstimate;
        basicAnalysis.textContent = analysisText;
        
        // 질문 컨테이너 숨기고 결과 컨테이너 표시
        if (questionContainer && resultContainer) {
            questionContainer.style.display = 'none';
            resultContainer.style.display = 'block';
        }
    }
}

// 결제 폼 표시
if (showPayment) {
    showPayment.addEventListener('click', function() {
        if (paymentForm) paymentForm.style.display = 'block';
    });
}

// 결제 처리
if (processPayment) {
    processPayment.addEventListener('click', function() {
        const cardNumber = document.getElementById('cardNumber').value;
        const expiry = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;
        const cardName = document.getElementById('cardName').value;
        
        if (!cardNumber || !expiry || !cvv || !cardName) {
            alert('모든 결제 정보를 입력해주세요.');
            return;
        }
        
        // 실제로는 결제 게이트웨이 연동 필요
        alert('결제가 성공적으로 처리되었습니다! 상세 분석 결과를 확인하실 수 있습니다.');
    });
}

// 초기 질문 표시 (DOM이 로드된 후)
document.addEventListener('DOMContentLoaded', function() {
    if (startDiagnosis) {
        console.log('자가진단 기능 초기화 완료');
    }
});
