'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Play,
  Sparkles,
  Star,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { getIcon } from '@/lib/icon-map';
import {
  heroStats,
  trustedPlatforms,
  impactStats,
  homeServices,
  whyUsFeatures,
  whyUsBenefits,
} from '@/data/homepage';
import { testimonials } from '@/data/testimonials';

// Animated Counter
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animationFrame: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value]);

  const fmt = (n: number) => n >= 10000 ? `${(n / 1000).toFixed(0)}K` : n.toLocaleString();

  return <span ref={ref}>{fmt(count)}{suffix}</span>;
}

export default function HomePage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-[8%] w-72 h-72 md:w-96 md:h-96 rounded-full bg-nova-purple/20 blur-[80px]" />
        <div className="absolute bottom-1/4 right-[8%] w-64 h-64 md:w-80 md:h-80 rounded-full bg-electric-blue/15 blur-[70px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-nova-purple/8 blur-[100px]" />

        <div className="container relative pt-24 pb-20 md:pt-28 md:pb-24">
          <div className="max-w-5xl mx-auto text-center">

            {/* Launch badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-6 md:mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nova-purple/12 border border-nova-purple/25 text-nova-purple text-sm font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Trusted by <strong>100+</strong> creators worldwide
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.08] tracking-tight mb-6 md:mb-8 heading-pro"
            >
              Premium Digital{' '}
              <br className="hidden sm:block" />
              Services for{' '}
              <span className="gradient-text">
                Creators
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 32 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed"
            >
              AI automation, professional video editing, and content services
              to supercharge your content empire.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-14 md:mb-20"
            >
              <Link href="/products">
                <Button size="lg" className="group w-full sm:w-auto h-13 px-8 text-base rounded-xl">
                  Explore Products
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="secondary" size="lg" className="group w-full sm:w-auto h-13 px-8 text-base rounded-xl">
                  <Play className="w-4 h-4" />
                  View Our Work
                </Button>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto"
            >
              {heroStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
                  className="relative group"
                >
                  <div className="card-pro p-4 md:p-5 text-center rounded-2xl">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-1">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-border/40 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-nova-purple"
            />
          </motion.div>
        </motion.div>
      </section>


      {/* ===== TRUSTED BY SECTION ===== */}
      <section className="py-10 border-y border-border/40 bg-card/30 backdrop-blur-sm overflow-hidden">
        <div className="container">
          <p className="text-center text-xs font-bold tracking-widest text-muted-foreground uppercase mb-6">
            Trusted by creators and brands across India
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-40">
            {trustedPlatforms.map((name) => (
              <span key={name} className="text-sm font-semibold text-foreground">{name}</span>
            ))}
          </div>
        </div>
      </section>


      {/* ===== STATS SECTION ===== */}
      <StatsSection />


      {/* ===== SERVICES SECTION ===== */}
      <ServicesSection />


      {/* ===== WHY US SECTION ===== */}
      <WhyUsSection />


      {/* ===== TESTIMONIAL SECTION ===== */}
      <TestimonialSection />


      {/* ===== CTA SECTION ===== */}
      <CTASection />
    </>
  );
}


function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const stats = impactStats;

  return (
    <section ref={ref} className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-card/40" />
      <div className="absolute inset-0 bg-dots-pattern opacity-30" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-nova-purple/12 border border-nova-purple/25 text-nova-purple text-xs font-bold tracking-widest uppercase">
              Our Impact
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 heading-pro">
            Numbers That{' '}
            <span className="gradient-text">Speak Volumes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Join the growing community of creators who transformed their content game with NovaMint.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-pro p-5 md:p-7 text-center group hover:scale-[1.02]"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {(() => { const Icon = getIcon(stat.icon); return <Icon className="w-6 h-6 text-white" />; })()}
              </div>
              <div className="text-3xl md:text-4xl xl:text-5xl font-bold gradient-text">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-semibold text-sm md:text-base mt-2 mb-0.5">{stat.label}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const services = homeServices;

  return (
    <section ref={ref} className="py-16 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-nova-purple/12 border border-nova-purple/25 text-nova-purple text-xs font-bold tracking-widest uppercase">
              What We Offer
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 heading-pro">
            Everything You Need to{' '}
            <span className="gradient-text">Scale Your Content</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From video editing to AI automation — 17+ professional services to help you create, grow, and monetize.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={service.href} className="group block h-full">
                <div className="card-pro h-full p-6 md:p-8 rounded-2xl relative overflow-hidden">
                  {/* Subtle gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  <div className="relative flex items-start gap-5">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {(() => { const Icon = getIcon(service.icon); return <Icon className="w-6 h-6 text-white" />; })()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg md:text-xl font-bold group-hover:text-nova-purple transition-colors">
                          {service.title}
                        </h3>
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-nova-purple/12 text-nova-purple border border-nova-purple/20">
                          {service.tag}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm md:text-base mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-nova-purple text-lg">
                          {service.price}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-nova-purple transition-colors">
                          Learn more
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10 md:mt-12"
        >
          <Link href="/services">
            <Button variant="secondary" size="lg" className="group px-8">
              View All Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


function WhyUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const features = whyUsFeatures;
  const benefits = whyUsBenefits;

  return (
    <section ref={ref} className="relative py-16 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-card/30" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex mb-5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-nova-purple/12 border border-nova-purple/25 text-nova-purple text-xs font-bold tracking-widest uppercase">
                Why NovaMint
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 heading-pro">
              Results That Speak{' '}
              <span className="gradient-text">Louder Than Words</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We don't just create content. We build digital empires.
              Our clients see real, measurable, lasting growth.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3.5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + index * 0.1 }}
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-nova-purple to-electric-blue flex items-center justify-center flex-shrink-0 shadow-sm shadow-nova-purple/30">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm md:text-base text-foreground/90">{item}</span>
                </motion.div>
              ))}
            </div>

            <Link href="/contact">
              <Button size="lg" className="group px-8 shadow-lg shadow-nova-purple/25">
                Get Started Today
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 md:gap-5"
          >
            {features.map((item, index) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="card-pro p-6 md:p-7 text-center rounded-2xl cursor-default"
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  {(() => { const Icon = getIcon(item.icon); return <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />; })()}
                </div>
                <h4 className="font-bold text-base md:text-lg mb-1">{item.title}</h4>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const homeTestimonials = testimonials.filter((t) => t.featured || t.id <= 3).slice(0, 3);

  return (
    <section ref={ref} className="py-16 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-nova-purple/12 border border-nova-purple/25 text-nova-purple text-xs font-bold tracking-widest uppercase">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 heading-pro">
            Loved by{' '}
            <span className="gradient-text">Creators Everywhere</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Don't just take our word for it — hear from the creators we've helped scale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-10 md:mb-12">
          {homeTestimonials.map((t, index) => {
            const initials = t.name.split(' ').map((w) => w[0]).join('');
            return (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="card-pro p-6 md:p-7 rounded-2xl flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="text-sm md:text-base text-foreground/85 leading-relaxed mb-5 flex-1">
                &quot;{t.content}&quot;
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nova-purple to-electric-blue flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {initials}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-muted-foreground text-xs">{t.role} • {t.company}</div>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/testimonials">
            <Button variant="secondary" size="lg" className="group px-8">
              Read More Stories
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl md:rounded-3xl"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-nova-purple via-[hsl(240,70%,55%)] to-electric-blue" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.15),transparent_55%)]" />
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-electric-blue/30 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-nova-purple/40 blur-3xl" />

          <div className="relative z-10 p-10 md:p-16 lg:p-20 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs font-bold tracking-widest uppercase mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ready to Scale?
            </motion.div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-5 heading-pro">
              Let's Build Your
              <br />
              Content Empire
            </h2>
            <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Join 100+ creators who trusted NovaMint to transform their content.
              Your growth story starts here.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white !text-[hsl(260,70%,25%)] hover:bg-white/90 border-0 shadow-xl shadow-black/20 px-8 font-bold text-base"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white hover:bg-white/10 hover:border-white/60 px-8 text-base"
                >
                  Explore Services
                </Button>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex items-center justify-center gap-6 mt-10 text-white/55 text-xs">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                No contracts
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Unlimited revisions
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                24h response time
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
