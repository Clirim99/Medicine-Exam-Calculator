document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', llogaritPiket);
    }
});

function llogaritPiket() {

    // =========================
    // MATURA (Max 30 pikë)
    // =========================
    const maturaInput = document.getElementById('matura-sakta');
    const maturaSakta = parseFloat(maturaInput.value);

    if (isNaN(maturaSakta)) {
        alert("Ju lutem shkruani numrin e pyetjeve të sakta në Maturë.");
        return;
    }

    if (maturaSakta < 0 || maturaSakta > 100) {
        alert("Matura duhet të jetë mes 0 dhe 100.");
        return;
    }

    const piketMatura = maturaSakta * 0.3;

    // =========================
    // SUKSESI (Max 30 pikë)
    // =========================
    const klasa10 = document.getElementById('klasa10').value;
    const klasa11 = document.getElementById('klasa11').value;
    const klasa12 = document.getElementById('klasa12').value;

    if (klasa10 === "" || klasa11 === "" || klasa12 === "") {
        alert("Ju lutem zgjidhni suksesin për të gjitha klasat (10, 11, 12).");
        return;
    }

    const p10 = parseFloat(klasa10);
    const p11 = parseFloat(klasa11);
    const p12 = parseFloat(klasa12);

    const piketSuksesi = p10 + p11 + p12;

    // =========================
    // PROVIMI PRANUES (Max 40)
    // =========================
    const pranuesSakta =
        parseFloat(document.getElementById('pranues-sakta').value) || 0;

    const pranuesGabim =
        parseFloat(document.getElementById('pranues-gabim').value) || 0;

    const pranuesSaktaSaktesuar = Math.min(Math.max(pranuesSakta, 0), 50);
    const pranuesGabimSaktesuar = Math.min(Math.max(pranuesGabim, 0), 50);

    if (pranuesSaktaSaktesuar + pranuesGabimSaktesuar > 50) {
        alert("Numri i pyetjeve të sakta dhe gabim nuk mund të jetë më i madh se 50.");
        return;
    }

    let piketPranues =
        (pranuesSaktaSaktesuar * 0.8) -
        (pranuesGabimSaktesuar * 0.26);

    piketPranues = Math.max(0, piketPranues);
    piketPranues = Math.min(40, piketPranues);

    // =========================
    // TOTALI
    // =========================
    const totali =
        piketMatura +
        piketSuksesi +
        piketPranues;

    // =========================
    // SHFAQ REZULTATIN
    // =========================
    document.getElementById('total-points').textContent =
        totali.toFixed(2);

    document.getElementById('detailed-breakdown').innerHTML = `
        <strong>Detajet e llogaritjes:</strong><br>
        • Pikët nga Matura: <strong>${piketMatura.toFixed(2)}</strong> / 30.00<br>
        • Pikët nga Suksesi: <strong>${piketSuksesi.toFixed(2)}</strong> / 30.00<br>
        • Pikët nga Provimi Pranues: <strong>${piketPranues.toFixed(2)}</strong> / 40.00<br><br>
        <strong>Totali: ${totali.toFixed(2)} / 100.00</strong>
    `;

    const resultBox = document.getElementById('result-box');
    resultBox.style.display = 'block';

    resultBox.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}