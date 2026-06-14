import Image from "next/image";

export default function HeroPanel() {
  return (
    <section className="relative hidden lg:flex lg:w-1/2 overflow-hidden items-end px-14 pb-14">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG2tiTixRmmPLzuqcpBp3qY6hyIBN6ZwH7Grb_TJ-L2WLyxEGZph5EuN2U1o84abGXLgE9Hh3KGweXPOVPCIaCdGslnfAJhthiuZrK_0uA0tp2TMZvuUTJmHD8OCMUv59B2TO-T4wsZ0IXunfrClhrKqncGfIn0zZTm-4deyK0wbp6MkLjV-RBGasVwwkdXWz6oSNgKVje4AWSAqQEa7Z1jw3MG44N0bhWNP2WuvchLApUUhGDzLJwMyKObwJPgBsSRBf9cXIZ35w"
          alt="AuraSpa Wellness Hero"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>
      <div className="relative z-10 w-full max-w-lg stagger-up">
        <h1 className="text-white mb-5 font-display" style={{ fontSize: 52, lineHeight: 1.15, fontWeight: 600 }}>
          Nơi tâm hồn<br />được chữa lành
        </h1>
        <div className="h-px w-20 mb-5" style={{ background: "rgba(255,255,255,0.4)" }} />
        <p className="text-white/85 uppercase italic" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.15em" }}>
          Vẻ đẹp được tái sinh qua sự tĩnh lặng. — AURASPA
        </p>
      </div>
    </section>
  );
}