// Dëgjuesi i klikimit të butonit
document.getElementById('calculate-btn').addEventListener('click', llogaritPiket);

function llogaritPiket() {
    // 1. Logjika për Maturë (Max 30 pikë)
    const maturaSakta = parseFloat(document.getElementById('matura-sakta').value) || 0;
    const maturaSaktaSaktësuar = Math.min(Math.max(maturaSakta, 0), 100);
    const piketMatura = maturaSaktaSaktësuar * 0.3;

    // 2. Logjika për Sukses (Max 30 pikë)
    const p10 = parseFloat(document.getElementById('klasa10').value) || 0;
    const p11 = parseFloat(document.getElementById('klasa11').value) || 0;
    const p12 = parseFloat(document.getElementById('klasa12').value) || 0;
    const piketSuksesi = p10 + p11 + p12;

    // 3. Logjika për Provim Pranues (Max 40 pikë)
    const pranuesSakta = parseFloat(document.getElementById('pranues-sakta').value) || 0;
    const pranuesGabim = parseFloat(document.getElementById('pranues-gabim').value) || 0;
    
    const pranuesSaktaSaktësuar = Math.min(Math.max(pranuesSakta, 0), 50);
    const pranuesGabimSaktësuar = Math.min(Math.max(pranuesGabim, 0), 50);

    // Formula: (sakta * 0.8) - (gabim * 0.26)
    let piketPranues = (pranuesSaktaSaktësuar * 0.8) - (pranuesGabimSaktësuar * 0.26);
    if (piketPranues < 0) piketPranues = 0; 

    // Totali Final
    const totali = piketMatura + piketSuksesi + piketPranues;

    // Shfaqja në faqe (DOM)
    document.getElementById('total-points').innerText = totali.toFixed(2);
    
    document.getElementById('detailed-breakdown').innerHTML = `
        <strong>Detajet e llogaritjes:</strong><br>
        • Pikët nga Matura: <strong>${piketMatura.toFixed(2)}</strong> / 30.00<br>
        • Pikët nga Suksesi: <strong>${piketSuksesi.toFixed(2)}</strong> / 30.00<br>
        • Pikët nga Provimi Pranues: <strong>${piketPranues.toFixed(2)}</strong> / 40.00
    `;

    // Shfaq kutinë e rezultateve jeshile
    document.getElementById('result-box').style.display = 'block';
    
    // Skroll i lehtë automatik tek rezultati
    document.getElementById('result-box').scrollIntoView({ behavior: 'smooth' });
}