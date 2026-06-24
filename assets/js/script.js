document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const clearBtn = document.getElementById('clear-btn');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', llogaritPiket);
    }

    // Logjika për pastrimin e të dhënave
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            document.getElementById('matura-sakta').value = '';
            document.getElementById('klasa10').value = '';
            document.getElementById('klasa11').value = '';
            document.getElementById('klasa12').value = '';
            document.getElementById('pranues-sakta').value = '';
            document.getElementById('pranues-gabim').value = '';
            
            const resultBox = document.getElementById('result-box');
            if (resultBox) {
                resultBox.style.display = 'none';
            }
        });
    }

    // ========================================================
    // LOGJIKA PËR SHFAQJEN DHE FSHEHJEN E TABELAVE TË PRAGJEVE
    // ========================================================
    const toggleBtn = document.getElementById('toggle-tables-btn');
    const tablesSection = document.getElementById('tables-section');

    if (toggleBtn && tablesSection) {
        toggleBtn.addEventListener('click', () => {
            tablesSection.classList.toggle('hidden');
            
            if (tablesSection.classList.contains('hidden')) {
                toggleBtn.innerHTML = '<span class="btn-icon">📈</span> Shiko Pragjet e Vitëve të Mëparshëm';
            } else {
                toggleBtn.innerHTML = '<span class="btn-icon">📉</span> Fshih pikët minimale të pranimit ndër vite';
            }
        });
    }
});

function llogaritPiket() {

    // =========================
    // MATURA
    // =========================
    const maturaInput = document.getElementById('matura-sakta');
    const maturaValue = maturaInput.value.trim();

    if (maturaValue === "") {
        alert("Fusha 'Pyetje të sakta (Matura)' nuk mund të jetë bosh.");
        maturaInput.focus();
        return;
    }

    const maturaSakta = parseFloat(maturaValue);

    if (isNaN(maturaSakta)) {
        alert("Ju lutem shkruani një numër të vlefshëm për Maturën.");
        return;
    }

    if (maturaSakta < 0 || maturaSakta > 100) {
        alert("Matura duhet të jetë midis 0 dhe 100.");
        return;
    }

    const piketMatura = maturaSakta * 0.3;

    // =========================
    // SUKSESI
    // =========================
    const klasa10 = document.getElementById('klasa10').value;
    const klasa11 = document.getElementById('klasa11').value;
    const klasa12 = document.getElementById('klasa12').value;

    if (klasa10 === "" || klasa11 === "" || klasa12 === "") {
        alert("Ju lutem zgjidhni suksesin për të gjitha klasat (10, 11, 12).");
        return;
    }

    const piketSuksesi =
        parseFloat(klasa10) +
        parseFloat(klasa11) +
        parseFloat(klasa12);

    // =========================
    // PROVIMI PRANUES
    // =========================
    const pranuesSaktaInput = document.getElementById('pranues-sakta');
    const pranuesGabimInput = document.getElementById('pranues-gabim');

    const pranuesSaktaVal = pranuesSaktaInput.value.trim();
    const pranuesGabimVal = pranuesGabimInput.value.trim();

    if (pranuesSaktaVal === "") {
        alert("Fusha 'Pyetje të sakta (Provimi Pranues)' nuk mund të jetë bosh.");
        pranuesSaktaInput.focus();
        return;
    }

    const pranuesSakta = parseFloat(pranuesSaktaVal);
    const pranuesGabim = pranuesGabimVal === "" ? 0 : parseFloat(pranuesGabimVal);

    if (isNaN(pranuesSakta) || isNaN(pranuesGabim)) {
        alert("Ju lutem shkruani numra të vlefshëm në Provimin Pranues.");
        return;
    }

    if (
        pranuesSakta < 0 || pranuesSakta > 50 ||
        pranuesGabim < 0 || pranuesGabim > 50
    ) {
        alert("Vlerat duhet të jenë midis 0 dhe 50.");
        return;
    }

    if (pranuesSakta + pranuesGabim > 50) {
        alert("Numri total i pyetjeve nuk mund të jetë më i madh se 50.");
        return;
    }

    let piketPranues =
        (pranuesSakta * 0.8) -
        (pranuesGabim * 0.26);

    piketPranues = Math.max(0, Math.min(40, piketPranues));

    // =========================
    // TOTALI
    // =========================
    const totali =
        piketMatura +
        piketSuksesi +
        piketPranues;

    // =========================
    // OUTPUT
    // =========================
    document.getElementById('total-points').textContent =
        totali.toFixed(2);

    document.getElementById('detailed-breakdown').innerHTML = `
        <strong>Detajet e llogaritjes:</strong><br>
        • Matura: <strong>${piketMatura.toFixed(2)}</strong> / 30<br>
        • Suksesi: <strong>${piketSuksesi.toFixed(2)}</strong> / 30<br>
        • Provimi Pranues: <strong>${piketPranues.toFixed(2)}</strong> / 40<br><br>
        <strong>Total: ${totali.toFixed(2)} / 100</strong>
    `;

    const resultBox = document.getElementById('result-box');
    resultBox.style.display = 'block';

    resultBox.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}