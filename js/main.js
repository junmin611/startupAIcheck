// 탭 전환 기능
function switchTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });
    
    const tabButtons = document.querySelectorAll('.tab');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    document.getElementById(tabId).style.display = 'block';
    document.querySelector(`.tab[onclick="switchTab('${tabId}')"]`).classList.add('active');
}

// 매출 계산 기능
function calculateProfit() {
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseFloat(document.getElementById('quantity').value);
    const fixedCost = parseFloat(document.getElementById('fixedCost').value);
    const variableCost = parseFloat(document.getElementById('variableCost').value);
    
    if (isNaN(price) || isNaN(quantity) || isNaN(fixedCost) || isNaN(variableCost)) {
        alert('모든 필드에 숫자를 입력해주세요.');
        return;
    }
    
    const revenue = price * quantity;
    const totalCost = fixedCost + variableCost;
    const profit = revenue - totalCost;
    
    document.getElementById('revenue').textContent = revenue.toLocaleString() + '원';
    document.getElementById('profit').textContent = profit.toLocaleString() + '원';
    
    // 결과 표시
    document.getElementById('results').style.display = 'block';
    
    // 분석 결과 표시
    let analysisText = '';
    if (profit > 0) {
        const profitMargin = (profit / revenue) * 100;
        analysisText = `<p>예상 월매출은 <strong>${revenue.toLocaleString()}원</strong>이며, 예상 순수익은 <strong>${profit.toLocaleString()}원</strong>입니다.</p>
        <p>수익률은 <strong>${profitMargin.toFixed(2)}%</strong>로 `;
        
        if (profitMargin < 10) {
            analysisText += '낮은 편입니다. 비용 절감이나 가격 전략을 재검토해 보세요.</p>';
        } else if (profitMargin < 30) {
            analysisText += '적정한 수준입니다. 안정적인 비즈니스 성장이 가능합니다.</p>';
        } else {
            analysisText += '매우 높은 수준입니다. 지속 가능한 비즈니스 모델로 성장이 기대됩니다.</p>';
        }
        
        if (fixedCost > revenue * 0.5) {
            analysisText += '<p><strong>주의:</strong> 고정 비용이 매출의 50% 이상을 차지합니다. 초기 투자 비용을 줄이는 방안을 고려해보세요.</p>';
        }
    } else {
        analysisText = `<p>예상 월매출(${revenue.toLocaleString()}원)이 총 비용(${totalCost.toLocaleString()}원)보다 낮아 <strong>손실이 발생할 수 있습니다</strong>.</p>
        <p>비즈니스 모델을 재검토하고 가격 인상, 판매량 증대 또는 비용 절감 방안을 고려해보세요.</p>`;
    }
    
    document.getElementById('analysis').innerHTML = analysisText;
    
    // 차트 생성
    createChart(revenue, fixedCost, variableCost, profit);
}

function createChart(revenue, fixedCost, variableCost, profit) {
    const ctx = document.getElementById('profitChart').getContext('2d');
    
    // 기존 차트가 있으면 제거
    if (window.myChart) {
        window.myChart.destroy();
    }
    
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['매출 및 비용 분석'],
            datasets: [
                {
                    label: '예상 월매출',
                    data: [revenue],
                    backgroundColor: '#3498db',
                    borderColor: '#2980b9',
                    borderWidth: 1
                },
                {
                    label: '고정 비용',
                    data: [fixedCost],
                    backgroundColor: '#e74c3c',
                    borderColor: '#c0392b',
                    borderWidth: 1
                },
                {
                    label: '변동 비용',
                    data: [variableCost],
                    backgroundColor: '#f39c12',
                    borderColor: '#d35400',
                    borderWidth: 1
                },
                {
                    label: '순수익',
                    data: [profit],
                    backgroundColor: '#2ecc71',
                    borderColor: '#27ae60',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '금액 (원)'
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
