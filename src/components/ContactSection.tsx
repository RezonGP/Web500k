"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { sound } from "@/utils/audio";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Brand Identity",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setSubmitted(true);
  };

  return (
    <section className="min-h-screen px-6 pt-28 pb-24 sm:px-12 sm:pt-32 animate-in fade-in duration-500">
      {/* Top Section Header */}
      <div className="mb-12 flex items-baseline justify-between border-b border-white/20 pb-4 font-sans text-xs uppercase tracking-wider text-white/60 font-medium">
        <span>CONTACT // START A PROJECT</span>
        <span>OPEN FOR COMMISSIONS & FREELANCE</span>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Studio Info Left */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-12">
          <div className="flex flex-col gap-6">
            <h1 className="font-display text-4xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-5xl">
              LET’S CRAFT THOUGHTFUL DESIGN TOGETHER.
            </h1>
            <p className="font-sans text-sm text-white/70 leading-relaxed sm:text-base">
              Sẵn sàng hợp tác cùng các thương hiệu, doanh nghiệp khởi nghiệp và dự án sáng tạo.
              Gửi thông điệp hoặc liên hệ trực tiếp qua số điện thoại bên dưới.
            </p>
          </div>

          <div className="flex flex-col gap-6 font-sans text-xs text-white">
            <div className="border-t border-white/10 pt-4">
              <span className="text-white/40 block mb-1 font-medium">LOCATION</span>
              <p className="text-white/90 font-display">Ho Chi Minh City, Vietnam</p>
            </div>

            <div className="border-t border-white/10 pt-4">
              <span className="text-white/40 block mb-1 font-medium">DIRECT CONTACT</span>
              <div className="flex flex-col gap-1 text-sm font-bold font-display">
                <a
                  href="tel:0862442475"
                  onMouseEnter={() => sound.playHover()}
                  className="hover:text-amber-300 transition-colors"
                >
                  TEL: 0862 442 475
                </a>
                <a
                  href="mailto:namtien3006@gmail.com"
                  onMouseEnter={() => sound.playHover()}
                  className="hover:text-amber-300 transition-colors uppercase"
                >
                  EMAIL: NAMTIEN3006@GMAIL.COM
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Form Right */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-xs border border-white/20 bg-neutral-950/90 p-8 text-center animate-in zoom-in-95 duration-300">
              <CheckCircle2 className="h-12 w-12 text-emerald-400 mb-4" />
              <h3 className="font-display text-2xl font-bold uppercase text-white mb-2">
                TRANSMISSION RECEIVED
              </h3>
              <p className="font-sans text-xs text-white/60 max-w-md">
                Cảm ơn bạn đã liên hệ. Trần Nam Tiến sẽ phản hồi lại bạn trong thời gian sớm nhất.
              </p>
              <button
                onClick={() => {
                  sound.playClick();
                  setSubmitted(false);
                }}
                onMouseEnter={() => sound.playHover()}
                className="mt-6 rounded-xs border border-white/30 px-5 py-2.5 font-sans text-xs text-white hover:bg-white hover:text-black transition-all font-semibold"
              >
                GỬI TIN NHẮN KHÁC
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 rounded-xs border border-white/10 bg-neutral-950/40 p-6 sm:p-10 font-sans text-xs text-white"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-white/50 uppercase font-medium">TÊN CỦA BẠN *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="rounded-xs border border-white/20 bg-black/60 px-4 py-3 text-white placeholder-white/20 focus:border-white focus:outline-hidden"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/50 uppercase font-medium">EMAIL *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@company.com"
                    className="rounded-xs border border-white/20 bg-black/60 px-4 py-3 text-white placeholder-white/20 focus:border-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-white/50 uppercase font-medium">SỐ ĐIỆN THOẠI</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="09..."
                    className="rounded-xs border border-white/20 bg-black/60 px-4 py-3 text-white placeholder-white/20 focus:border-white focus:outline-hidden"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-white/50 uppercase font-medium">LOẠI DỰ ÁN</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="rounded-xs border border-white/20 bg-neutral-900 px-4 py-3 text-white focus:border-white focus:outline-hidden"
                  >
                    <option value="Brand Identity">Brand Identity (Nhận diện thương hiệu)</option>
                    <option value="Packaging">Packaging (Bao bì sản phẩm)</option>
                    <option value="Typography">Typography & 3D Visual</option>
                    <option value="Marketing">Marketing & Social Campaign</option>
                    <option value="UI/UX Design">UI/UX & Web Design</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white/50 uppercase font-medium">NỘI DUNG YÊU CẦU / BRIEF *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mô tả ý tưởng, yêu cầu hoặc thời hạn mong muốn..."
                  className="rounded-xs border border-white/20 bg-black/60 px-4 py-3 text-white placeholder-white/20 focus:border-white focus:outline-hidden resize-none"
                />
              </div>

              <button
                type="submit"
                onMouseEnter={() => sound.playHover()}
                data-cursor="SUBMIT"
                className="group flex items-center justify-center gap-2 rounded-xs bg-white py-4 font-display text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-amber-300 hover:text-black active:scale-[0.99]"
              >
                <span>GỬI YÊU CẦU</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
