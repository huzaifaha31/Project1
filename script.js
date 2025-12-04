document.addEventListener('DOMContentLoaded', () => {
    const senaraiPenyakitUL = document.getElementById('senarai-penyakit');
    const butiranRawatanDiv = document.getElementById('butiran-rawatan');

    // Fungsi untuk memuatkan data JSON
    async function muatData() {
        try {
            // Pastikan fail data.json berada di lokasi yang sama
            const response = await fetch('data.json'); 
            const dataPenyakit = await response.json();
            
            paparSenaraiPenyakit(dataPenyakit);

        } catch (error) {
            butiranRawatanDiv.innerHTML = '<p class="error">Gagal memuatkan data manuskrip. Sila pastikan fail data.json wujud dan formatnya betul.</p>';
            console.error('Ralat memuatkan data:', error);
        }
    }

    // Fungsi untuk memaparkan senarai penyakit di sidebar
    function paparSenaraiPenyakit(dataPenyakit) {
        dataPenyakit.forEach(penyakit => {
            const listItem = document.createElement('li');
            listItem.textContent = penyakit.penyakit;
            listItem.dataset.id = penyakit.id; 
            
            listItem.addEventListener('click', () => {
                paparButiran(penyakit);
                aktifkanSenaraiItem(listItem);
            });
            senaraiPenyakitUL.appendChild(listItem);
        });
        
        // Paparkan butiran penyakit pertama secara lalai
        if (dataPenyakit.length > 0) {
            paparButiran(dataPenyakit[0]);
            aktifkanSenaraiItem(senaraiPenyakitUL.querySelector('li'));
        }
    }

    // Fungsi untuk menanda item yang dipilih sebagai 'aktif'
    function aktifkanSenaraiItem(element) {
        senaraiPenyakitUL.querySelectorAll('li').forEach(li => {
            li.classList.remove('active');
        });
        element.classList.add('active');
    }


    // Fungsi untuk memaparkan butiran rawatan lengkap
    function paparButiran(data) {
        const htmlButiran = `
            <h2>Rawatan Manuskrip untuk: ${data.penyakit}</h2>
            
            <div class="illustrasi-manuskrip">
                <img src="placeholder-manuscript.jpg" alt="Ilustrasi Rawatan ${data.penyakit}">
                <small><em>Gantikan 'placeholder-manuscript.jpg' dengan gambar herba/manuskrip berkaitan.</em></small>
            </div>
            
            <div class="butiran-item">
                <h3>📜 Bahan Ramuan</h3>
                <ul>
                    ${data.bahan_ramuan.map(ramuan => `<li>${ramuan}</li>`).join('')}
                </ul>
            </div>
            
            <div class="butiran-item">
                <h3>🏺 Kaedah Penyediaan</h3>
                <p>${data.kaedah_penyediaan}</p>
            </div>
            
            <div class="butiran-item">
                <h3>💊 Cara Penggunaan</h3>
                <p>${data.cara_penggunaan}</p>
            </div>

            <div class="butiran-item">
                <h3>✨ Ayat Al-Quran / Jampi</h3>
                <p class="jampi">${data.ayat_jampi}</p>
            </div>
            
        `;
        
        butiranRawatanDiv.innerHTML = htmlButiran;
    }

    // Mulakan pemuatan data apabila laman dimuatkan
    muatData();
});