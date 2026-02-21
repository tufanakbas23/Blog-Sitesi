# Laravel Blog Sistemi

Laravel 5.8 framework'ü ile geliştirilmiş, hem ön yüz (frontend) hem de yönetim paneli (backend) içeren kişisel blog sistemidir. Kullanıcılar siteye girerek makaleleri okuyabilir, kategorilere göre filtreleyebilir ve iletişim formu aracılığıyla mesaj gönderebilir. Admin paneli üzerinden makaleler, kategoriler, sayfalar ve site ayarları yönetilebilir.

---

## Özellikler

### Ön Yüz (Frontend)

- **Makale listeleme:** Makaleler ana sayfada sayfalama (pagination) ile listelenir. Her makalede başlık, kategori, oluşturulma tarihi ve özet görüntülenir.
- **Tekil makale görüntüleme:** Makaleye tıklandığında tam içerik gösterilir. Her görüntülemede hit sayacı artırılır.
- **Kategori filtreleme:** Belirli bir kategoriye ait makaleleri filtreleyerek görüntüleme imkanı sunar.
- **Dinamik sayfalar:** Admin panelinden oluşturulan sayfalar, navigation menüsünde otomatik olarak sıralı şekilde görüntülenir.
- **İletişim formu:** Ziyaretçiler ad, e-posta, konu ve mesaj bilgilerini doldurarak mesaj gönderebilir. Mesajlar SMTP üzerinden e-posta olarak iletilir.
- **Okuma ilerleme çubuğu:** Sayfa kaydırıldıkça üstte ilerleme çubuğu gösterilir.
- **Okuma süresi tahmini:** Makale içeriğine göre tahmini okuma süresi hesaplanır.
- **Hover animasyonları:** Makale kartlarında fare üzerine gelince görsel efektler uygulanır.
- **Responsive tasarım:** Bootstrap 4 altyapısıyla mobil uyumlu tasarım.
- **Bakım modu:** Site bakımdayken ziyaretçilere bakım sayfası gösterilir.

### Yönetim Paneli (Backend)

- **Admin giriş sistemi:** Middleware tabanlı oturum kontrolü ile korunan yönetim paneli.
- **Makale yönetimi (CRUD):** Makale oluşturma, düzenleme, silme, aktif/pasif yapma. Silinen makaleler soft delete ile çöp kutusuna taşınır, geri yüklenebilir veya kalıcı olarak silinebilir.
- **Kategori yönetimi:** Kategori ekleme, düzenleme, silme ve aktif/pasif durumu yönetimi. AJAX tabanlı çalışır.
- **Sayfa yönetimi:** Statik sayfa oluşturma, düzenleme, silme ve sıralama desteği.
- **Site ayarları:** Site başlığı, logo, favicon ve sosyal medya bağlantıları (Facebook, Twitter, GitHub, LinkedIn, YouTube, Instagram) admin panelinden yönetilir.
- **Dashboard:** Genel site istatistiklerinin görüntülendiği kontrol paneli.

---

## Teknolojiler

| Teknoloji | Sürüm / Detay |
|---|---|
| PHP | >= 7.1.3 |
| Laravel | 5.8 |
| Veritabanı | MySQL |
| Frontend | Bootstrap 4, Blade Templates |
| Fontlar | Google Fonts (Lora, Open Sans) |
| İkonlar | Font Awesome 5 |
| Bildirimler | Toastr |
| E-posta | SMTP (Gmail desteği) |

---

## Veritabanı Yapısı

Proje 6 tablodan oluşmaktadır:

**articles** - Makaleler tablosu
- `id`, `category_id` (foreign key), `title`, `image`, `content`, `hit`, `status`, `slug`, `deleted_at` (soft delete), `created_at`, `updated_at`

**categories** - Kategoriler tablosu
- `id`, `name`, `slug`, `status`, `created_at`, `updated_at`

**pages** - Sayfalar tablosu
- `id`, `title`, `image`, `content`, `slug`, `order`, `status`, `created_at`, `updated_at`

**contacts** - İletişim mesajları tablosu
- `id`, `name`, `email`, `topic`, `message`, `created_at`, `updated_at`

**admins** - Yönetici tablosu
- `id`, `name`, `email`, `password`

**configs** - Site ayarları tablosu
- `id`, `title`, `logo`, `favicon`, `active`, `facebook`, `twitter`, `github`, `linkedin`, `youtube`, `instagram`, `created_at`, `updated_at`

---

## Proje Yapısı

```
blog2/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Back/                  # Admin panel controller'ları
│   │   │   │   ├── ArticleController  # Makale CRUD islemleri
│   │   │   │   ├── AuthController     # Giris / cikis islemleri
│   │   │   │   ├── CategoryController # Kategori yönetimi
│   │   │   │   ├── ConfigController   # Site ayarlari
│   │   │   │   ├── Dashboard          # Kontrol paneli
│   │   │   │   └── PageController     # Sayfa yönetimi
│   │   │   └── Front/
│   │   │       └── Homepage           # Tüm ön yüz islemleri
│   │   └── Middleware/
│   │       ├── isAdmin                # Admin oturum kontrolü
│   │       └── isLogin                # Giris sayfasi yönlendirmesi
│   └── Models/
│       ├── Admin, Article, Category, Config, Contact, Page
│
├── database/migrations/               # Veritabani tablolari
├── resources/views/
│   ├── back/                          # Admin panel görünümleri
│   │   ├── articles/                  # Makale sayfaları (index, create, update, trashed)
│   │   ├── categories/                # Kategori sayfası
│   │   ├── config/                    # Site ayarları sayfası
│   │   ├── pages/                     # Sayfa yönetimi
│   │   └── layouts/                   # Admin panel layout dosyaları
│   └── front/                         # Ön yüz görünümleri
│       ├── homepage, single, category, contact, page, offline
│       ├── layouts/                   # Header, footer, master layout
│       └── widgets/                   # Tekrar kullanılan bileşenler
│
├── public/front/                      # CSS, JS, görseller
│   ├── css/custom-enhancements.css    # Okuma çubuğu, hover efektleri
│   └── js/custom-enhancements.js      # İlerleme çubuğu, okuma süresi
│
└── routes/web.php                     # Tüm route tanımlamaları
```

---

## Kurulum

### Gereksinimler

- PHP >= 7.1.3
- Composer
- MySQL
- Apache veya Nginx (XAMPP, Laragon vb. kullanılabilir)

### Adımlar

1. **Projeyi klonlayın**
   ```bash
   git clone https://github.com/tufanakbas23/blog2.git
   cd blog2
   ```

2. **Composer bağımlılıklarını yükleyin**
   ```bash
   composer install
   ```

3. **Ortam dosyasını oluşturun**

   `.env.example` dosyasını `.env` olarak kopyalayın ve kendi bilgilerinize göre düzenleyin:
   ```bash
   cp .env.example .env
   ```

4. **Uygulama anahtarını oluşturun**
   ```bash
   php artisan key:generate
   ```

5. **Veritabanını yapılandırın**

   `.env` dosyasında veritabanı bilgilerini doldurun:
   ```
   DB_DATABASE=blog2
   DB_USERNAME=root
   DB_PASSWORD=sifreniz
   ```

6. **Migration'ları çalıştırın**
   ```bash
   php artisan migrate
   ```

7. **E-posta ayarları (opsiyonel)**

   İletişim formunun çalışması için `.env` dosyasında SMTP bilgilerini doldurun:
   ```
   MAIL_DRIVER=smtp
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USERNAME=emailadresiniz@gmail.com
   MAIL_PASSWORD=uygulama_sifreniz
   MAIL_ENCRYPTION=tls
   ```

8. **Sunucuyu başlatın**
   ```bash
   php artisan serve
   ```
   Tarayıcıda `http://localhost:8000` adresine gidin.

---

## Yönetim Paneline Erişim

Yönetim paneline `/admin/giris` adresinden erişebilirsiniz. İlk kullanım için veritabanındaki `admins` tablosuna manuel olarak bir kayıt eklemeniz gerekmektedir.

---

## Route Yapısı

### Ön Yüz

| Method | URL | Açıklama |
|---|---|---|
| GET | `/` | Ana sayfa, makale listesi |
| GET | `/kategori/{slug}` | Kategoriye göre makaleler |
| GET | `/{kategori}/{slug}` | Tekil makale sayfası |
| GET | `/{slug}` | Statik sayfa |
| GET | `/iletisim` | İletişim formu |
| POST | `/iletisim` | İletişim formu gönderimi |

### Yönetim Paneli (admin/ prefix)

| Method | URL | Açıklama |
|---|---|---|
| GET/POST | `admin/giris` | Admin giriş |
| GET | `admin/panel` | Dashboard |
| Resource | `admin/makaleler` | Makale CRUD |
| GET | `admin/makaleler/silinenler` | Silinen makaleler |
| GET | `admin/kategoriler` | Kategori yönetimi |
| GET | `admin/sayfalar` | Sayfa yönetimi |
| GET | `admin/ayarlar` | Site ayarları |

---

## Ekran Görüntüleri

> Ekran görüntüleri eklemek isterseniz `screenshots/` klasörü oluşturup aşağıdaki gibi kullanabilirsiniz:
>
> ```markdown
> ![Ana Sayfa](screenshots/homepage.png)
> ![Admin Panel](screenshots/admin-panel.png)
> ```

---

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır.
