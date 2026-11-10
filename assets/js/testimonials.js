// Jyoti Studio testimonials: real Google reviews (data) + renderer, in one file.
(function () {
  // ---- DATA: real Google reviews ----
  const testimonials = [
    { name: "Mahesh Bhosale", rating: 5, local: false, text: "Thank you Jyoti studio for this very beautiful surprise ❤️👌 Received both frames, very premium quality and same as original photo. The finishing and packing was excellent. You made our memories even more special. Highly recommended for anyone looking for quality photo framing work." },
    { name: "zeenal waghela", rating: 5, local: true, text: "Excellent photography!!! I hired them for my daughter’s birthday party and they did an excellent work. Lovely pictures and videos." },
    { name: "Pranali Sakpal", rating: 5, local: false, text: "Excellent photographer. Very professional and patient. The locations chosen were also very good" },
    { name: "raaghav prasad", rating: 5, local: true, text: "Mr.Bala of Jyoti studio is very professional and patience in handling the customer. The photo print is quick and quality is really good. Well maintained studio with portfolios of couple, kids photoshoot. I'll recommend this place for my friends" },
    { name: "Ravi Kumar", rating: 5, local: true, text: "Good skilled and professional person. Happy with the service obtained." },
    { name: "Rajat Manohar", rating: 5, local: true, text: "Amazing photographer and editor. The quality of work is outstanding, and the attention to detail in both photography and editing is truly impressive. Highly recommended!" },
    { name: "Rinku Pathak", rating: 5, local: false, text: "What I loved the most is how natural and confident I look in the pictures. That really shows your skill behind the camera. You didn’t just take photos, you captured expressions and vibes so perfectly. Every frame feels thoughtful and well-composed." },
    { name: "Pratik Gaonkar", rating: 5, local: false, text: "Great studio! Quick photo editing and excellent editing skills as per my requirements by Bala. Photos turned out really nice. Totally recommended!" },
    { name: "Mandeep Kaur Chahal", rating: 5, local: false, text: "He is excellent in his work truly awesome and picture quality is superb he is very professional n very good at his work truly recommend it." },
    { name: "Jatin Gujarathi", rating: 5, local: false, text: "Very quick and professional service. The owner is friendly and helpful. Best studio in the area for high-quality photos at a reasonable price." },
    { name: "suresh chaudhari", rating: 5, local: false, text: "We booked Jyoti Studio for our family function and they did a fantastic job. They captured all the beautiful moments perfectly. The team was punctual and very cooperative. Really happy with the results And Highly recommended for anyone looking for good photography." },
    { name: "Maya", rating: 5, local: false, text: "The photo studio exceeded our expectations The team was professional creative and made us feel at ease The photos turned out amazing Highly recommend for their excellent service and quality" },
    { name: "niraj pandey", rating: 5, local: true, text: "We had a wonderful experience with Jyoti Photo Studio for our baby's pre-birthday shoot. They delivered fantastic photos and video. A special shout-out to Mr. Bala Choudhary, who consistently provides the best-suited themes and ideas and offers great client service. Our baby pre-birthday cinematic video is awesome—it truly made our day and captured all the precious memories! They have been our trusted photographer since our maternity shoot, and every moment they capture is truly memorable." },
    { name: "Roshani's Glam", rating: 5, local: false, text: "Very nice photography and themes also nice.. I have done photoshoot for my baby boy 1 year bday. Very impressive.. photographer very polite and humble..thanks for capturing beautiful memories." },
    { name: "Samadhan Tupe", rating: 5, local: false, text: "I must say, jyoti studio is truly exceptional. His attention to detail, creativity, and ability to capture perfect moments made the entire experience unforgettable. Truly impressive work!" },
    { name: "Sarika Raul", rating: 5, local: false, text: "Superb, nice place for kids photoshoot...very happy with hospitality" },
    { name: "Aishwarya Rajane", rating: 5, local: false, text: "Jyotis studio is an absolute pro. Their professionalism, creativity, and incredible eye for detail are unmatched. The way they captured the genuine emotion of the day was magical. Thank you for making my special moments a lifetime..!" },
    { name: "Shreyas Deshmukh", rating: 5, local: false, text: "Excellent work...Best studio in Palava city and Runwal Garden Dombivli, highly recommend.." },
    { name: "Swakshar Ghosh", rating: 5, local: false, text: "Nice experience. Photos delivered within minutes and post pic edit is nice" },
    { name: "Pallavi Sawant", rating: 5, local: false, text: "Best photo studio in Dombivli. Thanks Jyoti studio and photography and team. Nice clicks my daughter pics." },
    { name: "Vikas Choudhari", rating: 5, local: false, text: "The only place to do the best photography is Jyoti Studio and Photography. We took very beautiful and nice photos." },
    { name: "abhishek singh", rating: 5, local: true, text: "Thank you for capturing our special moments so beautifully. The pictures tell a story we will cherish forever. Excellent service, friendly approach, and stunning results!" },
    { name: "Ashutosh", rating: 5, local: false, text: "Quality photos instantly at affordable price. Nothing more you want than this." },
    { name: "Neha Shukla", rating: 5, local: false, text: "Jyoti studio and photography provide best service. My dream photo shoot is done by Jyoti studio and it was a best photo shoot." },
    { name: "Vrushali Desai", rating: 5, local: false, text: "Very helpful and quick photo prints! They customize photos according to your need!" },
    { name: "Mridhula Shaji", rating: 5, local: false, text: "Very professional service. Highly recommend." },
    { name: "Shraddha Waghchaure", rating: 5, local: false, text: "Very good experience with Mr Bala Choudhry and team. It's very good team." },
    { name: "Sudip Saha", rating: 5, local: true, text: "Nice experience. Got photo within 10min. Thanks!!" },
    { name: "Sagar Perla", rating: 5, local: true, text: "Nice Photography & very interactive supportive.." },
    { name: "Alka Bajpai", rating: 5, local: false, text: "Excellent service and instant photos really recommend it" }
  ];
  const track = document.getElementById("testiTrack");
  // ---- CONFIG: card headings & labels (edit freely) ----
  const cfg = {
    defaultLabel: "Google Review",
    localGuideLabel: "Google Review · Local Guide",
    fallbackTitles: ["Beyond Beautiful", "Effortless & Elegant", "Pure Magic", "Worth Every Moment"],
    readMoreChars: 180, // reviews longer than this are cut with a "Read more" toggle
    photoBase: "https://lh3.googleusercontent.com/",
    // Real reviewer profile photos (Google). If one fails to load, initials show instead.
    photos: {
      "Mahesh Bhosale": "a/ACg8ocJSjlC0EGqo2Jdilr-bKtbOnd4d-W7Qsl-Zsu1Olj2uh8ILQg=s128-c-rp-mo-br100",
      "zeenal waghela": "a-/ALV-UjWNSOBF1mPvHkVjVjLoJjyA0h8J5X5quuuQCN6LnlBbhl08xrY=s128-c-rp-mo-ba12-br100",
      "Pranali Sakpal": "a/ACg8ocKPUtqoS_5Dt-R__h9HLuLmDmdzfmqD2yJ3tnr1WnyKyZ9-VQ=s128-c-rp-mo-br100",
      "raaghav prasad": "a-/ALV-UjXJAJ6Vbc2VJiWLMjOUtu9pDfLxAXFbRUOSgjzcBICACJ0rf0XP=s128-c-rp-mo-ba12-br100",
      "Ravi Kumar": "a/ACg8ocLs-QV4QzOF_Z0d1QIpScd2BW61QtdosK36t7W4bSTIuuEIuIvf=s128-c-rp-mo-ba12-br100",
      "Rajat Manohar": "a-/ALV-UjXP2YBsye4PRcfFlHqmBoKT1qq7f6pzu4v-KOWJKxghVo45DW4YqA=s128-c-rp-mo-ba12-br100",
      "Rinku Pathak": "a/ACg8ocKj_jKg-R8Z5XeXcNrYkGgC-7fW75X5v1yJP-KOjHSeBnLb=s128-c-rp-mo-br100",
      "Pratik Gaonkar": "a-/ALV-UjW0Hv8QMFe3t3S-8o-B9jPYBcC1qllUQdNIkfnB-TE8dd7vSNau=s128-c-rp-mo-br100",
      "Mandeep Kaur Chahal": "a-/ALV-UjW05afAlDmUrvBL2Z3WsAKcBD3p840l2QGQ8xkAK73NxgZEYYP6=s128-c-rp-mo-br100",
      "Jatin Gujarathi": "a/ACg8ocJ4f08CECHQxuZOcsmdhP9EcKbMaHsEDTJ2siGKxRQHwUXSNA=s128-c-rp-mo-br100",
      "suresh chaudhari": "a-/ALV-UjVqYzx2wLmRDCAS9O84xP37cI2Pm3dPDRHnX_P7r9SCjpFSbgvX=s128-c-rp-mo-br100",
      "Maya": "a-/ALV-UjWtcG9tSaP6irud2Jido6_H2bQU8dVCmpcP9Lr8rsGY7Vf6mRRF_g=s128-c-rp-mo-br100",
      "niraj pandey": "a-/ALV-UjU3m4f_GzVry0Pg05uR4fsptC5zJXyQPfAEkQEDuc7pxpYGAB4Yhg=s128-c-rp-mo-ba12-br100",
      "Roshani's Glam": "a-/ALV-UjWL1jk3Ol5ucc1CrD58XHcfwLVE1AhZSalhcUhQrGpHURlxsnY=s128-c-rp-mo-br100",
      "Samadhan Tupe": "a-/ALV-UjWg2pHIcT5wXJ28zZsJ0Ag3c6gs3xKwTyDs5yZ1B7tC0Wgk8KEi=s128-c-rp-mo-br100",
      "Sarika Raul": "a-/ALV-UjV0FfTjeWNFyr2U11LQaurErbcx4Xv7r0ppJmp2Uv2HTCRKWwfF=s128-c-rp-mo-br100",
      "Aishwarya Rajane": "a-/ALV-UjUi6ultXugIu2VcHSvyhHRrNH6KkNWS0MnhOIRP588h1HLnmrf9zw=s128-c-rp-mo-br100",
      "Shreyas Deshmukh": "a/ACg8ocLLZFVzthFe6s0YmF3X8EtbxMltkKK6qQ1-3RxB85kCmi1x4g=s128-c-rp-mo-br100",
      "Swakshar Ghosh": "a-/ALV-UjXjeoAPRIjIurQKZ0wAkUrFrfWuD5JX9B_atnXxtjqbQkrp5kfisQ=s128-c-rp-mo-br100",
      "Pallavi Sawant": "a-/ALV-UjUQhUYfPtgY7Np8-DQh_boYv-ep9FgFxJvYKVahuDIZky5ijyP9Yg=s128-c-rp-mo-br100",
      "Vikas Choudhari": "a-/ALV-UjVXBueeLVnNgi4zDyQCa2xUVPoNgI9x02OjlCI9-1vrKc6Oq_do=s128-c-rp-mo-br100",
      "abhishek singh": "a-/ALV-UjVmQgnjzoXPYFUlI2LisLMbF3eyvmG90MC9W_DyttrUQD96yF9T=s128-c-rp-mo-ba12-br100",
      "Ashutosh": "a-/ALV-UjV7cuxTMmUvsLkh5R1qBsMxU1qG88X-n9-8teDAgV7Il7z3QSo=s128-c-rp-mo-br100",
      "Neha Shukla": "a/ACg8ocIg1sLEsRd7yO7rEV5UAGiXZ1WUvdAfZHAfnjqAiQDRbkeunw=s128-c-rp-mo-br100",
      "Vrushali Desai": "a-/ALV-UjU1umP3KLqDjwAJ0eV0ps1Qwrl8QdVnfGQkZSmtlyhrVY6Es3J5=s128-c-rp-mo-br100",
      "Mridhula Shaji": "a/ACg8ocJ8-b14RDrSxac2c-QcUwl1xICzvvHKkxJ_kcbvqzMlIsdNaw=s128-c-rp-mo-br100",
      "Shraddha Waghchaure": "a/ACg8ocLFp3YGQ4C5nOzkX9IzjsRzwqlxIpeDD9fY_4fBG74EdUsWTg=s128-c-rp-mo-br100",
      "Sudip Saha": "a-/ALV-UjVbgUA9sgYLaRZRXwRNUrmFybUKlt6tQ7c4UunepMjpKRyVqzt5=s128-c-rp-mo-ba12-br100",
      "Sagar Perla": "a/ACg8ocL4K1RtUW-VQ0E9D3Xg4VNsGXu2Dl_DNj1QPWyTY0NHbx6Zcg=s128-c-rp-mo-ba12-br100",
      "Alka Bajpai": "a/ACg8ocKH2ShlpzsD2hRDFWhlrErVMjvu517i1O3_R_MZuMzpHBoA-Bsh=s128-c-rp-mo-br100"
    },
    titles: {
      "Mahesh Bhosale": "Premium Framing",
      "zeenal waghela": "Lovely Pictures & Videos",
      "Pranali Sakpal": "Patient & Professional",
      "raaghav prasad": "Quick, Quality Prints",
      "Ravi Kumar": "Skilled & Professional",
      "Rajat Manohar": "Outstanding Quality",
      "Rinku Pathak": "Natural & Confident",
      "Pratik Gaonkar": "Beautifully Edited",
      "Mandeep Kaur Chahal": "Superb Picture Quality",
      "Jatin Gujarathi": "Quick & Friendly",
      "suresh chaudhari": "Beautiful Family Moments",
      "Maya": "Beyond Expectations",
      "niraj pandey": "Unforgettable Memories",
      "Roshani's Glam": "Beautiful Themes",
      "Samadhan Tupe": "Truly Exceptional",
      "Sarika Raul": "Perfect for Kids",
      "Aishwarya Rajane": "Pure Magic",
      "Shreyas Deshmukh": "Best in Runwal Garden",
      "Swakshar Ghosh": "Photos in Minutes",
      "Pallavi Sawant": "Best Studio in Dombivli",
      "Vikas Choudhari": "Beautiful Photos",
      "abhishek singh": "Stories We'll Cherish",
      "Ashutosh": "Instant & Affordable",
      "Neha Shukla": "Dream Photo Shoot",
      "Vrushali Desai": "Custom Photo Prints",
      "Mridhula Shaji": "Highly Professional",
      "Shraddha Waghchaure": "A Wonderful Team",
      "Sudip Saha": "Ready in 10 Minutes",
      "Sagar Perla": "Supportive & Interactive",
      "Alka Bajpai": "Excellent & Instant"
    }
  };
  const dotsWrap = document.getElementById("testiDots");
  
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  
  const clean = (s) =>
    String(s).replace(/<br\s*\/?>/gi, " ").replace(/\s+/g, " ").trim().replace(/^"+|"+$/g, "");
  
  const initials = (name) =>
    name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  
  function card(t, i) {
    const title = t.title || cfg.titles[t.name] || cfg.fallbackTitles[i % cfg.fallbackTitles.length];
    const label = t.local ? cfg.localGuideLabel : cfg.defaultLabel;
    const full = clean(t.text);
    let body = `&ldquo;${esc(full)}&rdquo;`;
    if (full.length > cfg.readMoreChars) {
      const cut = full.slice(0, cfg.readMoreChars).replace(/\s+\S*$/, "").replace(/[\s,.;:!-]+$/, "");
      body =
        `&ldquo;<span class="testi-short">${esc(cut)}&hellip;</span><span class="testi-full" hidden>${esc(full)}</span>&rdquo; ` +
        `<button type="button" class="testi-more" aria-expanded="false" style="display:block;margin-top:10px;color:#8d0714;font-weight:600;font-size:13px;letter-spacing:.06em;text-transform:uppercase;text-decoration:underline;text-underline-offset:4px">Read more</button>`;
    }
    const src = t.photo || (cfg.photos[t.name] ? cfg.photoBase + cfg.photos[t.name] : "");
    const avatar =
      `<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#5a3326;color:#f3e9d8;font-family:Barlow,sans-serif;font-weight:500;font-size:20px">${esc(initials(t.name))}</span>` +
      (src ? `<img src="${esc(src)}" alt="${esc(t.name)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.style.display='none'" />` : "");
    return `
      <div class="testi-card">
        <div class="flex items-center gap-3">
          <i class="ri-double-quotes-r text-[22px] text-[#8d0714]" aria-hidden="true"></i>
          <h3 class="font-secondary text-[20px] font-medium text-[#5a3326]">${esc(title)}</h3>
        </div>
        <p class="mt-4 text-[15px] font-secondary leading-[1.75] text-[#2a2a2a]">${body}</p>
        <div class="mt-auto flex items-center gap-4 pt-6">
          <div class="testi-avatar">${avatar}</div>
          <div>
            <p class="font-secondary text-[15px] font-medium text-[#5a3326]">${esc(t.name)}</p>
            <p class="mt-1 text-[10px] font-secondary font-semibold uppercase tracking-wide text-[#8d0714]">${label}</p>
          </div>
        </div>
      </div>`;
  }
  
  // Taller / roomier cards so long reviews fit comfortably.
  const style = document.createElement("style");
  style.textContent =
    "#testimonials .testi-card{min-height:360px;max-width:430px;padding:36px 36px 32px}" +
    "#testimonials .testi-card p.mt-4{font-size:16px;line-height:1.8}" +
    "#testimonials .testi-avatar{width:64px;height:64px}";
  document.head.appendChild(style);

  function init() {
  if (track) {
    track.innerHTML = testimonials.map(card).join("");

    // Read more / Read less
    track.addEventListener("click", (e) => {
      const btn = e.target.closest(".testi-more");
      if (!btn) return;
      const p = btn.parentElement;
      const open = btn.getAttribute("aria-expanded") === "true";
      p.querySelector(".testi-short").hidden = !open;
      p.querySelector(".testi-full").hidden = open;
      btn.setAttribute("aria-expanded", String(!open));
      btn.textContent = open ? "Read more" : "Read less";
    });
  
    // Same dots + scroll behaviour as before (dots map to scroll progress).
    const dots = dotsWrap ? dotsWrap.querySelectorAll("button") : [];
    if (dots.length) {
      const update = () => {
        const max = track.scrollWidth - track.clientWidth;
        const i = max > 0 ? Math.round((track.scrollLeft / max) * (dots.length - 1)) : 0;
        dots.forEach((d, n) => d.classList.toggle("is-active", n === i));
      };
      track.addEventListener("scroll", update, { passive: true });
      dots.forEach((d, n) =>
        d.addEventListener("click", () => {
          const max = track.scrollWidth - track.clientWidth;
          track.scrollTo({ left: (max * n) / (dots.length - 1), behavior: "smooth" });
        })
      );
      update();
    }
  }
  }
  init();
})();