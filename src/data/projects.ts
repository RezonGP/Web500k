import type { Project, CategoryType } from "@/types";

export type { Project, CategoryType };

export const CATEGORIES = [
  "ALL",
  "KEY VISUAL",
  "PACKAGING DESIGN",
  "BRANDING",
  "TYPOGRAPHIC",
  "CAMPAIGN",
] as const;

export const projects: Project[] = [
  // ==========================================
  // 1. KEY VISUAL (Trang 4 - 13)
  // ==========================================
  {
    id: "kv-rebellion",
    title: "Wild Rebellion & Raw Freedom",
    year: "2026",
    client: "Personal Visual Exploration",
    category: "KEY VISUAL",
    categoryLabel: "Key Visual Artwork",
    image: "/images/portfolio/kv_rebellion_hero.jpg",
    stills: [
      "/images/portfolio/kv_rebellion_hero.jpg",
      "/images/portfolio/kv_rebellion_detail.jpg",
      "/images/portfolio/kv_rebellion_concept.jpg",
    ],
    description: "Tác phẩm Key Visual định hướng nghệ thuật khai thác tinh thần tự do nguyên bản và tính phản kháng nội tâm. Kết hợp bố cục trừu tượng, chất liệu gai góc và chiều sâu thị giác đa tầng.",
    concept: "Wild Rebellion & Raw Freedom: Khai thác sự va chạm giữa hình khối sắc nhọn và ánh sáng phản chiếu, tạo nên nhịp điệu thị giác phóng khoáng và tràn đầy năng lượng.",
    roles: ["Art Direction", "Key Visual", "Composition"],
    credits: [
      { role: "Art Director", name: "Trần Nam Tiến" },
      { role: "Year", name: "2026" },
      { role: "Medium", name: "Digital Mixed Media & 3D" },
    ],
  },
  {
    id: "kv-silentfall",
    title: "Silent Fall & Deep Abyss",
    year: "2026",
    client: "Cinematic Visual Concept",
    category: "KEY VISUAL",
    categoryLabel: "Key Visual Artwork",
    image: "/images/portfolio/kv_silentfall_hero.jpg",
    stills: [
      "/images/portfolio/kv_silentfall_hero.jpg",
      "/images/portfolio/kv_silentfall_detail.jpg",
      "/images/portfolio/kv_silentfall_concept.jpg",
    ],
    description: "Key Visual mang sắc thái trầm mặc và chiều sâu thăm thẳm. Lấy cảm hứng từ sự tĩnh lặng của không gian vô tận và cảm giác chìm đắm trong chiều không gian trừu tượng.",
    concept: "Silent Fall & Deep Abyss: Sử dụng độ tương phản cao, chuyển sắc mượt mà giữa các mảng tối sâu thẳm và nguồn sáng lẻ loi để gợi tả nỗi cô đơn kiêu hãnh.",
    roles: ["Concept Art", "Key Visual", "Color Grading"],
    credits: [
      { role: "Visual Artist", name: "Trần Nam Tiến" },
      { role: "Discipline", name: "Key Visual & Moodboard" },
      { role: "Format", name: "A4 Landscape Editorial" },
    ],
  },
  {
    id: "kv-maiti",
    title: "OBT Rap Crew // Mai Tí Thumbnail",
    year: "2025",
    client: "OBT Music Crew",
    category: "KEY VISUAL",
    categoryLabel: "Music Video Visual & Thumbnail",
    image: "/images/portfolio/kv_maiti_hero.jpg",
    stills: [
      "/images/portfolio/kv_maiti_hero.jpg",
      "/images/portfolio/kv_maiti_thumb2.jpg",
      "/images/portfolio/kv_maiti_concept.jpg",
    ],
    description: "Thiết kế bộ thumbnail và key visual cho bài rap 'Mai Tí' của nhóm nhạc OBT. Định hình không khí âm nhạc underground cuồng nhiệt với khói mờ và ánh đèn đỏ ma mị.",
    concept: "Lấy đám đông ẩn danh làm nhân vật chính. Mọi người cùng hòa vào nhịp điệu của bài rap trong không gian chìm đắm của ánh đèn sân khấu và nhịp bass dồn dập.",
    roles: ["Art Direction", "Thumbnail Design", "Music Artwork"],
    credits: [
      { role: "Designer", name: "Trần Nam Tiến" },
      { role: "Client", name: "OBT Rap Crew" },
      { role: "Track", name: "Mai Tí" },
    ],
  },

  // ==========================================
  // 2. PACKAGING DESIGN (Trang 14 - 36)
  // ==========================================
  {
    id: "pkg-fanta",
    title: "Fanta Orange // Cam Tươi Bùng Nổ",
    year: "2025",
    client: "Fanta Vietnam",
    category: "PACKAGING DESIGN",
    categoryLabel: "Beverage Packaging Design",
    image: "/images/portfolio/pkg_fanta_hero.jpg",
    stills: [
      "/images/portfolio/pkg_fanta_hero.jpg",
      "/images/portfolio/pkg_fanta_spread.jpg",
      "/images/portfolio/pkg_fanta_can3d.jpg",
      "/images/portfolio/pkg_fanta_concept.jpg",
    ],
    description: "Thiết kế bao bì lon nước cam Fanta hướng đến không khí tươi mát, sảng khoái và năng động của thế hệ trẻ. Hình ảnh lát cam mọng nước bùng nổ năng lượng rực rỡ.",
    concept: "'Cam tươi bùng tung tóe' — Vui, tươi mát, dồi dào năng lượng. Kết hợp nét vẽ minh họa năng động cùng bố cục chữ hiện đại tạo cảm giác đã khát tức thì.",
    roles: ["Packaging Design", "3D Mockup", "Illustration"],
    credits: [
      { role: "Lead Designer", name: "Trần Nam Tiến" },
      { role: "Brand", name: "Fanta" },
      { role: "Category", name: "Aluminium Can Packaging" },
    ],
  },
  {
    id: "pkg-oldman",
    title: "Ông Già & Biển Cả // Book Cover",
    year: "2025",
    client: "Editorial Book Publishing",
    category: "PACKAGING DESIGN",
    categoryLabel: "Book Cover & Editorial Redesign",
    image: "/images/portfolio/pkg_oldman_hero.jpg",
    stills: [
      "/images/portfolio/pkg_oldman_hero.jpg",
      "/images/portfolio/pkg_oldman_spine.jpg",
      "/images/portfolio/pkg_oldman_spread.jpg",
      "/images/portfolio/pkg_oldman_concept.jpg",
    ],
    description: "Thiết kế lại bìa sách cho kiệt tác 'Ông già và biển cả' của Ernest Hemingway. Thể hiện một phần tinh thần cốt lõi của tác phẩm: con người nhỏ bé nhưng kiên cường trước sóng gió đại dương.",
    concept: "Sử dụng tông màu u buồn và kỹ thuật tương phản tối sáng để diễn tả cuộc vật lộn đơn độc của ông lão Santiago. Bìa sách toát lên vẻ trang nghiêm và chiều sâu triết lý.",
    roles: ["Book Cover Design", "Typography", "Editorial Print"],
    credits: [
      { role: "Designer", name: "Trần Nam Tiến" },
      { role: "Author", name: "Ernest Hemingway" },
      { role: "Format", name: "Hardcover & Dust Jacket" },
    ],
  },
  {
    id: "pkg-motocare",
    title: "High-End Moto Care // Đua Tốc Độ",
    year: "2025",
    client: "Motorsport Performance",
    category: "PACKAGING DESIGN",
    categoryLabel: "Industrial Product Packaging",
    image: "/images/portfolio/pkg_motocare_hero.jpg",
    stills: [
      "/images/portfolio/pkg_motocare_hero.jpg",
      "/images/portfolio/pkg_motocare_bottle.jpg",
      "/images/portfolio/pkg_motocare_box.jpg",
      "/images/portfolio/pkg_motocare_lineup.jpg",
      "/images/portfolio/pkg_motocare_concept.jpg",
    ],
    description: "Bộ bao bì chai xịt dưỡng và bảo dưỡng cao cấp dành riêng cho xe phân khối lớn. Mang tinh thần tốc độ đường đua mãnh liệt, cơ bắp và đậm chất công nghệ cao.",
    concept: "Tông đen nhám (Matte Black) phối cùng chi tiết kim loại và vạch kẻ kỹ thuật neon. Mỗi cấp độ tính năng được gán một điểm nhấn màu sắc nhận diện tức thì.",
    roles: ["Industrial Packaging", "Label Design", "3D Render"],
    credits: [
      { role: "Designer", name: "Trần Nam Tiến" },
      { role: "Client", name: "High-End Moto Performance" },
      { role: "Type", name: "Spray Bottle & Box Package" },
    ],
  },
  {
    id: "pkg-calendar",
    title: "Christmas Calendar 2026 // Lịch Giáng Sinh",
    year: "2026",
    client: "Seasonal Publishing",
    category: "PACKAGING DESIGN",
    categoryLabel: "Calendar & Print Production",
    image: "/images/portfolio/pkg_calendar_hero.jpg",
    stills: [
      "/images/portfolio/pkg_calendar_hero.jpg",
      "/images/portfolio/pkg_calendar_back.jpg",
      "/images/portfolio/pkg_calendar_mockup.jpg",
      "/images/portfolio/pkg_calendar_concept.jpg",
    ],
    description: "Bộ ấn phẩm lịch để bàn 12 tháng mừng Giáng Sinh 2026. Thiết kế trang nhã với hệ thống typography tinh xảo, chia làm 2 mặt: Tháng 1–6 (Bìa trước) và Tháng 7–12 (Bìa sau).",
    concept: "'Mùa Giáng Sinh - Đêm Nguyện Cầu, Đấng Cứu Thế Giáng Sinh': Biểu tượng ánh sáng, ngôi sao Bethlehem và những bông tuyết hình học cách điệu trang nghiêm.",
    roles: ["Calendar Design", "Print Layout", "Typography System"],
    credits: [
      { role: "Designer", name: "Trần Nam Tiến" },
      { role: "Year", name: "2026" },
      { role: "Format", name: "Desk Calendar 12 Months" },
    ],
  },

  // ==========================================
  // 3. BRANDING (Trang 37 - 46)
  // ==========================================
  {
    id: "brand-haita",
    title: "24 HaiTa // Matcha & Coffee Takeaway",
    year: "2025",
    client: "24 HaiTa Beverage",
    category: "BRANDING",
    categoryLabel: "Brand Identity & Packaging System",
    image: "/images/portfolio/brand_haita_hero.jpg",
    stills: [
      "/images/portfolio/brand_haita_hero.jpg",
      "/images/portfolio/brand_haita_signboard.jpg",
      "/images/portfolio/brand_haita_standee.jpg",
      "/images/portfolio/brand_haita_concept.jpg",
    ],
    description: "Bộ nhận diện thương hiệu hoàn chỉnh cho quán nước take-away 24 HaiTa. Ứng dụng đồng bộ trên ly giấy, túi xách thân thiện môi trường, standee, poster và menu quán.",
    concept: "Logo xoay quanh con số 24 (tên quán 24 HaiTa). Số 2 và số 4 được ghép nối thành một khối liên hoàn độc đáo; nét cong đậm của số 2 ôm trọn số 4 tượng trưng cho sự gắn kết và trọn vẹn.",
    roles: ["Logo Design", "Brand Guidelines", "Collateral"],
    credits: [
      { role: "Brand Designer", name: "Trần Nam Tiến" },
      { role: "Client", name: "24 HaiTa Takeaway" },
      { role: "Deliverables", name: "Logo, Packaging, Signage, Merch" },
    ],
  },
  {
    id: "brand-obt",
    title: "OBT Rap Crew // Underground Music",
    year: "2025",
    client: "OBT Hip-Hop Collective",
    category: "BRANDING",
    categoryLabel: "Music Brand & Merch Identity",
    image: "/images/portfolio/brand_obt_hero.jpg",
    stills: [
      "/images/portfolio/brand_obt_hero.jpg",
      "/images/portfolio/brand_obt_vinyl.jpg",
      "/images/portfolio/brand_obt_stickers.jpg",
      "/images/portfolio/brand_obt_concept.jpg",
    ],
    description: "Thiết kế nhận diện thương hiệu cho nhóm nhạc rap OBT. Ứng dụng trên áo thun merchandise, đĩa than vinyl, băng cassette retro, cờ sân khấu và sticker pack dán đường phố.",
    concept: "Logo lấy cảm hứng từ chiếc micro cổ điển — biểu tượng bất diệt của âm nhạc rap và phòng thu âm. Cách điệu 3 chữ cái O - B - T thành một khối monogram cơ học sắc bén và phong trần.",
    roles: ["Band Logo", "Merchandise", "Vinyl Artwork"],
    credits: [
      { role: "Designer", name: "Trần Nam Tiến" },
      { role: "Artist", name: "OBT Rap Crew" },
      { role: "Deliverables", name: "Monogram, Merch, Vinyl, Tape" },
    ],
  },
  {
    id: "brand-247express",
    title: "247Express // Brand Guideline System",
    year: "2026",
    client: "247Express Vietnam",
    category: "BRANDING",
    categoryLabel: "Corporate Brand Guideline",
    image: "/images/portfolio/brand_247express_hero.jpg",
    stills: [
      "/images/portfolio/brand_247express_hero.jpg",
      "/images/portfolio/brand_247express_guideline.jpg",
    ],
    description: "Bộ cẩm nang nhận diện thương hiệu (Brand Guideline) tiêu chuẩn cho tập đoàn chuyển phát nhanh 247Express. Chuẩn hóa lưới logo, màu sắc thương hiệu, kiểu chữ và ấn phẩm văn phòng.",
    concept: "Tốc độ và sự tin cậy: Biểu tượng mũi tên tốc độ kết hợp con đường cao tốc, tông màu đỏ cờ nhiệt huyết và xanh navy vững chãi thể hiện cam kết giao hàng an toàn, chuẩn xác.",
    roles: ["Brand System", "Corporate Guideline", "Design Manual"],
    credits: [
      { role: "Designer", name: "Trần Nam Tiến" },
      { role: "Client", name: "247Express" },
      { role: "Academic", name: "Đại học Văn Lang" },
    ],
  },

  // ==========================================
  // 4. TYPOGRAPHIC (Trang 47 - 51)
  // ==========================================
  {
    id: "typo-3d-chrome",
    title: "Liquid Chrome & 3D Spatial Form",
    year: "2026",
    client: "Experimental Typography Project",
    category: "TYPOGRAPHIC",
    categoryLabel: "3D Kinetic Letterform & Sculpture",
    image: "/images/portfolio/typo_chrome_hero.jpg",
    stills: [
      "/images/portfolio/typo_chrome_hero.jpg",
      "/images/portfolio/typo_chrome_silver.jpg",
      "/images/portfolio/typo_chrome_bubble.jpg",
      "/images/portfolio/typo_chrome_monaco.jpg",
      "/images/portfolio/typo_chrome_concept.jpg",
    ],
    description: "Khám phá nghệ thuật chữ trong không gian 3 chiều và bề mặt phản xạ kim loại lỏng. Phá vỡ cấu trúc chữ 2D truyền thống, coi chữ cái như những tác phẩm điêu khắc nghệ thuật đương đại.",
    concept: "Lấy cảm hứng từ kim loại lỏng, bong bóng xà phòng và nghệ thuật trừu tượng. Bộ chữ 'Monaco' và 'Nokie' được uốn nắn với độ căng bề mặt, tạo cảm giác mềm dẻo nhưng sáng bóng tựa gương soi.",
    roles: ["3D Typography", "Liquid Metal Shader", "Spatial Art"],
    credits: [
      { role: "Artist & Typographer", name: "Trần Nam Tiến" },
      { role: "Medium", name: "3D Blender & Liquid Shader" },
      { role: "Collection", name: "Monaco & Nokie Spatial Types" },
    ],
  },

  // ==========================================
  // 5. CAMPAIGN (Trang 52 - 56)
  // ==========================================
  {
    id: "camp-nvlima",
    title: "NVLIMA // Luxury Watch Campaign",
    year: "2025",
    client: "NVLIMA Timepieces & Fashion",
    category: "CAMPAIGN",
    categoryLabel: "Social Media Advertising Campaign",
    image: "/images/portfolio/camp_nvlima_hero.jpg",
    stills: [
      "/images/portfolio/camp_nvlima_hero.jpg",
      "/images/portfolio/camp_nvlima_post2.jpg",
      "/images/portfolio/camp_nvlima_post3.jpg",
      "/images/portfolio/camp_nvlima_concept.jpg",
    ],
    description: "Chiến dịch truyền thông mạng xã hội quảng bá dòng sản phẩm phụ kiện và đồng hồ cao cấp NVLIMA. Bố cục ấn phẩm hiện đại, tôn vinh độ chính xác cơ khí và phong cách sống thượng lưu.",
    concept: "Tôn vinh từng khoảnh khắc quý giá với ánh sáng studio sắc nét và tương phản mạnh. Bộ social post được thiết kế tối ưu hóa cho nền tảng đa phương tiện, gia tăng chuyển đổi thị giác.",
    roles: ["Social Campaign", "Visual Layout", "Art Direction"],
    credits: [
      { role: "Art Director", name: "Trần Nam Tiến" },
      { role: "Brand", name: "NVLIMA / LSIMA" },
      { role: "Deliverables", name: "Key Visual, Carousel, Story Posts" },
    ],
  },
];
