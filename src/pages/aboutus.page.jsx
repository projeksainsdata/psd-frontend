import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AnimationWrapper from '../common/page-animation';

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
    { name: 'Miftahul Huda', position: 'CEO' },
    { name: 'Apri Arami', position: 'CFO' },
    { name: 'Eggi Satria', position: 'CTO' },
    { name: 'Virdio Samuel', position: 'Team CTO' },
    { name: 'Happy Syahrul Ramadhan', position: 'Team CTO' },
    { name: 'Wulan Sabina', position: 'CMO' },
  ];

  return (
    <AnimationWrapper>
      <Container className="mx-auto max-w-4xl mt-5">
        <Row className="mt-5">
          <Col>
            <h2 className="text-2xl font-semibold mb-5">Tentang Projek Sains Data</h2>
            <p className="text-base mb-5">
              Sains Data, telah menjadi salah satu bidang yang paling penting dan menarik dalam era teknologi informasi saat ini. Proyek sains data merupakan upaya komprehensif untuk mengumpulkan, mengorganisir, menganalisis, dan menginterpretasikan data untuk mendapatkan wawasan ataupun informasi. Tujuannya adalah mengidentifikasi pola, tren, dan informasi tersembunyi yang dapat digunakan untuk mengambil keputusan berdasarkan bukti, memahami perilaku pelanggan, meningkatkan efisiensi operasional, atau bahkan meramalkan tren masa depan. Dengan peluang yang tak terbatas dan potensi besar untuk memberikan solusi inovatif dalam berbagai domain, projek sains data lahir sebagai platform yang menyelesaikan permasalahan dengan pendekatan pembelajaran dan melalui riset inovatif dalam dunia yang semakin dipermeabel dengan data.
            </p>
            <p className="text-base">
              Projek Sains Data lahir pada tanggal 03 Oktober 2022. Tempat dan kedudukan berada di Bandar Lampung, Lampung, Indonesia. Sifat dan status dari Projek Sains Data merupakan Start Up bidang data, sedangkan Diskusi Data merupakan Komunitas yang memuat komunitas belajar Sains Data.
            </p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={6}>
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <h2 className="text-2xl font-semibold">Visi</h2>
              <p className="text-base">Membangun Sains Data untuk Negeri dan Global melalui pembelajaran, inovasi, dan implementasi yang sustainable, dan responsible.</p>
            </div>
          </Col>
          <Col md={6}>
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <h2 className="text-2xl font-semibold">Misi</h2>
              <ul className="list-disc pl-5 text-base">
                <li>Membagi konten belajar bagaimana menyelesaikan masalah di berbagai domain sains data dengan metode saintifik dan berdasarkan data baik teknis maupun konsep.</li>
                <li>Meningkatkan produk sustainable development melalui penelitian sains data dan pengabdian masyarakat yang memiliki sifat responsible innovation.</li>
                <li>Mewadahi forum diskusi projek sains data yang berkelanjutan untuk membahas dan mengkaji dasar dan penerapan teknis proyek sains data agar dapat menyumbangkan inovasi dan kreativitas dibidang ilmu data dan portofolio di bidang data.</li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h3 className="text-xl font-semibold">Jadwal dan Program Projek Sains Data</h3>
            <ul className="list-disc pl-5 text-base">
              <li>Pembelajaran (Learning Path) merupakan program yang memuat jalur-jalur belajar sains data yang disusun dalam kurikulum projek sains data yaitu BARISTA (Basic - Analytics - Robotic - Intelligence - Softskill - Technology - Advanced Value), bentuk keluaran program ini adalah artikel ilmiah atau video.</li>
              <li>Inovasi (Roadmap Projek Sains Data) program ini merupakan penelitian yang menekankan pada inovasi dalam ilmu data. Keluaran berupa Artikel Ilmiah, Essay, Dataset, Perangkat Pintar, Aplikasi Perangkat Lunak.</li>
              <li>Sustainable (Aksi untuk SDGs) Sebagai generasi muda tentunya memiliki peran penting untuk menentukan nasib dari sebuah negara. Berlandasan SDGs, kami para generasi muda akan memberikan kontribusi nyata untuk mewujudkan SDGs demi kepentingan perdamaian dan kesejahteraan dunia. Kegiatan disajikan dalam Artikel, Podcast dan Webinar.</li>
              <li>Responsible (Pengabdian Masyarakat dan Kegiatan Bersama Anggota) Program ini bertujuan untuk meningkatkan solidaritas dan membagi ilmu pengetahuan kepada para anggota serta melatih kemampuan para anggota untuk menciptakan portofolio di bidang ilmu data. Kemudian ikut serta dalam membantu dan memecahkan masalah yang ada di sekitar kita melalui ilmu data. Kegiatan dibuat dalam Workshop, Meeting, Podcast, Pengabdian, dan Proyek.</li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
          <ul className="list-disc pl-5 text-base"></ul>
          <p>Jadwal Projek Sains Data:</p>
            <li>Senin Belajar Data. </li>
            <il>Senin Artikel Ilmiah. </il>
            <il>Rabu Cari Data. </il>
            <il>Rabu Solusi Statistik. </il>
            <li>Kamis Infografis. </li>
            <li>Kamis Codingan Manis. </li>
            <li>Sabtu Codingan Pintar. </li>
            <li>Sabtu SDGs. </li>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h3 className="text-xl font-semibold">Tim PSD (Projek Sains Data)</h3>
            <p className="text-base mb-4">Meet our dedicated team of professionals who work tirelessly to achieve our goals.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={index} name={member.name} position={member.position} />
              ))}
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <p className="text-base">If you have any questions or inquiries, feel free to contact us at projeksainsdata@gmail.com or follow us on Instagram @projeksainsdata.</p>
          </Col>
        </Row>
      </Container>
    </AnimationWrapper>
  );
};

export default AboutUsPage;
