import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AnimationWrapper from '../common/page-animation';
import logopsd from "../imgs/psd2.png"
import iconpsd from "../imgs/iconpsd.png"
import founderpsd from "../imgs/ardikasatria.jpg";
import { FaEnvelope } from 'react-icons/fa'


const TeamMemberCard = ({ name, position }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h4 className="text-lg font-semibold">{name}</h4>
      <p className="text-sm text-gray-600">{position}</p>
    </div>
  );
};

const AboutUsPage = () => {
  const teamMembers = [
    { name: 'Ardika Satria', position: 'Founder' },
  ];

  return (
    <AnimationWrapper>
      <Container className="mx-auto max-w-4xl mt-5">
        <Row className="mt-5">
          <Col>
            <div className='w-auto'>
                    <div className='banner-img position-relative w-auto'>
                     <img src={logopsd} alt="Logo Projek Sains Data" className="img-fluid" />
                    </div>
            </div>
            <h2 className="text-2xl font-semibold mb-5">Tentang Projek Sains Data</h2>
            <div className='flex flex-col lg:flex-row'>
              <div className='lg:w-1/2 mr-8 justify-left'>
                  <p className="text-base mb-5 text-left">
                  Projek Sains Data merupakan start up open platform atau platform terbuka untuk penulis yang memiliki peran dan antusias di bidang ilmu data mulai dari akademisi hingga profesional. Projek Sains Data atau PSD membuka ruang untuk belajar sains data yang lebih komprehensif, seperti sumber bacaan dari penulis blog komunitas, pembelajaran yang disusun berdasarkan domain sains data, buku original, tutorial penyelesaian studi kasus dengan real data, dan repositori proyek yang memuat latihan dari penggunaan konsep dan teori di sains data. Selain itu Projek Sains Data memiliki bisnis yang bergerak di bidang teknologi kembaran digital dengan kecerdasan buatan yang disebut Projek Sains Data Craft atau PSD-C. Fokus utama dari PSD-C adalah memberikan solusi untuk keputusan bisnis pada domain Energi, Lingkungan, Pertanian, Kesehatan, dan Manufaktur. PSD-C juga memberikan layanan konsultasi profesional untuk pengerjaan proyek sains data di industri maupun pendampingan riset. PSD memiliki komunitas diskusi yang disebut Diskusi Projek Sains Data atau DPSD. Komunitas ini memuat program yang menghubungkan para anggota untuk mendapatkan pelatihan, seminar, dan event tertentu, serta peluang koneksi kerjasama satu sama lain.
                  </p>
              </div>
              <div className='lg:w-1/2 w-auto justify-left'>
                <p className="text-base text-left">
                PSD berkomitmen penuh untuk meningkatkan digital literasi di Indonesia dalam pengetahuan ilmu data agar adaptasi teknologi berbasis kecerdasan buatan yang berkembang menyesuaikan industri dunia saat ini menjadi bagian yang dapat diterima dengan baik khususnya oleh masyarakat Indonesia. Memulai dengan memberikan pemahaman yang terstruktur dan berdasarkan riset, PSD mendorong terciptanya dan terwujudnya inovasi berkelanjutan di bidang ilmu data. Sehingga solusi melalui pendekatan ilmu data tetap berkembang dan penerapannya tidak disalahgunakan. Memprediksi masa depan tentu menjadi bagian penting dalam mempersiapkan masa sekarang dan tidak mengulangi kesalahan di masa lalu, bergabunglah dengan berkontribusi pada blog dan pembelajaran sains data di Projek Sains Data yang terhubung dengan Diskusi Projek Sains Data, lalu ikut menciptakan solusi proyek sains data masa depan dengan PSD-C. Projek Sains Data lahir pada tanggal 03 Oktober 2022. Tempat dan kedudukan berada di Bandar Lampung, Lampung, Indonesia. Sifat dan status dari Projek Sains Data merupakan Start Up bidang data. 
                </p>
              </div>
          </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={6}>
            <div className='flex flex-col lg:flex-row'>
                <div className='lg:w-1/2 mr-8 justify-left'>
                  <div className="bg-grey rounded-lg shadow p-4 mb-3">
                    <h2 className="text-2xl font-semibold">Visi</h2>
                    <p className="text-base text-left">Menjadi pusat pembelajaran sains data dan pusat pengembangan inovasi teknologi kembaran digital berbasis kecerdasan buatan yang diakui dunia</p>
                  </div>
                  <div className="p-4 mb-4">
                    <div className='banner-icon position-relative w-auto'>
                      <p>Logo Projek Sains Data</p>
                      <img src={iconpsd} alt="Icon Projek Sains Data" className="banner-icon img-fluid" />
                    </div>
                  </div>
                </div>
          

              <div className='lg:w-1/2 mr-8 justify-left'>
                <div className="bg-grey rounded-lg shadow p-4 mb-4">
                  <h2 className="text-2xl font-semibold">Misi</h2>
                  <ul className="list-disc pl-5 text-base text-left">
                    <li>Mengembangkan platform basis pengetahuan dan forum diskusi untuk mendukung kemajuan teknologi kecerdasan buatan dan pembelajaran ilmu sains data</li>
                    <li>Memberikan pelayanan profesional dengan solusi yang efektif dan efisien untuk masyarakat dan industri.</li>
                    <li>Mengembangkan produk teknologi kembaran digital yang mengedepankan inovasi berkelanjutan dengan mengadopsi teknologi kecerdasan buatan untuk memberikan wawasan dan prediksi yang akurat guna mendukung pengambilan keputusan bisnis, mengoptimalkan proses, dan meningkatkan efisiensi</li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h3 className="text-xl font-semibold">Tim Projek Sains Data</h3>
            <p className="text-base">Meet our dedicated team of professionals who work tirelessly to achieve our goals.</p>
            <div class="card-banner">
                <div class="card-content">
                  
                  <div>
                    <div class="w-40 h-40 mb-2">
                      <img src={founderpsd} alt="Founder Projek Sains Data" class="rounded-full img-fluid" />
                    </div>
                    <p className='font-bold'>Founder and CEO</p>
                    <p class="mb-2">Ardika Satria</p>
                    <p><a href="https://ardikasatria.com" target="_blank" rel="noopener noreferrer">ardikasatria.com</a></p>
                  </div>
                </div>
            </div>

          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <div className="text-center">
                <p className="text-base mb-4">
                  If you have any questions or inquiries, feel free to contact us.
                </p>
                <a
                  href="mailto:timpsd@projeksainsdata.com"
                  className="inline-flex items-center bg-light-green text-white px-4 py-2 rounded-full shadow-md hover:bg-grey-200 transition duration-300"
                >
                  <FaEnvelope className="text-4xl mr-2" /> timpsd@projeksainsdata.com
                </a>
            </div>
          </Col>
        </Row>
      </Container>
    </AnimationWrapper>
  );
};

export default AboutUsPage;
