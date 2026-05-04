// 🔹 Supabase 연결
const supabaseUrl = "https://pjhrbjgnbpzpqwbtvyuo.supabase.co";
const supabaseKey = "sb_publishable_Vzz3APYKcSJGeeg65puobw_roEKD6tt";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// 🔹 페이지 이동
function nextPage(pageNum) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page' + pageNum).classList.add('active');
}

// 🔹 1페이지 검증
function goToPage2() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const location = document.getElementById("location").value;

  if (!name || !age || !gender || !location) {
    alert("필수 입력을 완료해주세요.");
    return;
  }

  nextPage(2);
}

// 🔹 감정 항목 (8개)
const soundQuestions = [
  ["기분좋은", "짜증나는"],
  ["활동적인", "비활동적인"],
  ["차분한", "혼란스러운"],
  ["단조로운", "활기찬"]
];

const container = document.getElementById('questions');

// 🔹 슬라이더 생성 (0~5 연속)
soundQuestions.forEach((q, index) => {
  const div = document.createElement('div');
  div.className = "question";

  div.innerHTML = `
    <p>${q[0]} - ${q[1]}</p>

    <input type="range" min="0" max="5" step="0.1" value="2.5" id="q${index}"
      oninput="updateValue(${index})">

    <div class="slider-labels">
      <span>${q[1]}</span>
      <span>${q[0]}</span>
    </div>

    <div class="value" id="value${index}">2.5</div>
  `;

  container.appendChild(div);
});

// 🔹 값 표시
function updateValue(index) {
  const val = document.getElementById("q" + index).value;
  document.getElementById("value" + index).innerText = val;
}

// 🔹 년생 자동 생성
const ageSelect = document.getElementById("age");

for (let year = 2005; year >= 1980; year--) {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year + "년";
  ageSelect.appendChild(option);
}

// 🔹 제출
async function submitSurvey() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const location = document.getElementById("location").value;
  const phone = document.getElementById("phone").value;

  let answers = [];

  for (let i = 0; i < soundQuestions.length; i++) {
    answers.push(document.getElementById("q" + i).value);
  }

  const { error } = await supabaseClient
    .from('survey')
    .insert([
      {
        name,
        age,
        gender,
        location,
        phone,
        answers: JSON.stringify(answers)
      }
    ]);

  if (error) {
    alert("저장 실패");
  } else {
    alert("저장 완료");
    nextPage(3);
  }
}
