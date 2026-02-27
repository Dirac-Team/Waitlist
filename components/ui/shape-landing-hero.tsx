"use client";

import { motion } from "framer-motion";
import {
  Circle,
  Mail,
  Send,
  Command,
  SquarePen,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EtheralShadow } from "@/components/ui/etheral-shadow";

function FloatingIcon({
  className,
  delay = 0,
  size = 48,
  rotate = 0,
  icon: Icon,
  color = "rgba(255,255,255,0.07)",
  glowColor = "rgba(99,102,241,0.12)",
  bobDuration = 12,
}: {
  className?: string;
  delay?: number;
  size?: number;
  rotate?: number;
  icon: LucideIcon;
  color?: string;
  glowColor?: string;
  bobDuration?: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -100,
        rotate: rotate - 20,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate,
        scale: 1,
      }}
      transition={{
        duration: 2.2,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96] as [number, number, number, number],
        opacity: { duration: 1.4 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, -14, 0],
        }}
        transition={{
          duration: bobDuration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <div
          className="relative rounded-2xl p-4 md:p-5"
          style={{
            background: `linear-gradient(145deg, ${color}, rgba(255,255,255,0.02))`,
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: `0 12px 48px ${glowColor}, 0 0 0 0.5px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.05)`,
            backdropFilter: "blur(16px)",
            transform: `perspective(600px) rotateY(${rotate * 0.4}deg) rotateX(${rotate * -0.2}deg)`,
          }}
        >
          <Icon
            size={size}
            strokeWidth={1.2}
            style={{ color: "rgba(255,255,255,0.35)" }}
          />
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 25% 15%, rgba(255,255,255,0.1), transparent 55%)",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function HeroGeometric({
  badge = "Design Collective",
  title1 = "Elevate Your Digital Vision",
  title2 = "Crafting Exceptional Websites",
  children,
}: {
  badge?: string;
  title1?: string;
  title2?: string;
  children?: React.ReactNode;
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      {/* Ethereal shadow — base layer */}
      <EtheralShadow
        color="rgba(90, 80, 120, 1)"
        animation={{ scale: 70, speed: 55 }}
        noise={{ opacity: 0.5, scale: 1.2 }}
        sizing="fill"
      />

      {/* Subtle color wash over the shadow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.04] via-transparent to-rose-500/[0.04] blur-3xl" />

      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Mail — top-left, largest */}
        <FloatingIcon
          icon={Mail}
          delay={0.3}
          size={52}
          rotate={12}
          color="rgba(129,140,248,0.1)"
          glowColor="rgba(99,102,241,0.18)"
          bobDuration={13}
          className="left-[4%] md:left-[10%] top-[14%] md:top-[20%]"
        />

        {/* Send — bottom-right */}
        <FloatingIcon
          icon={Send}
          delay={0.5}
          size={42}
          rotate={-10}
          color="rgba(251,113,133,0.1)"
          glowColor="rgba(244,63,94,0.15)"
          bobDuration={11}
          className="right-[6%] md:right-[12%] bottom-[12%] md:bottom-[18%]"
        />

        {/* SquarePen (compose) — bottom-left */}
        <FloatingIcon
          icon={SquarePen}
          delay={0.4}
          size={38}
          rotate={-6}
          color="rgba(167,139,250,0.1)"
          glowColor="rgba(139,92,246,0.15)"
          bobDuration={14}
          className="left-[6%] md:left-[12%] bottom-[10%] md:bottom-[16%]"
        />

        {/* Command — top-right */}
        <FloatingIcon
          icon={Command}
          delay={0.6}
          size={34}
          rotate={18}
          color="rgba(251,191,36,0.08)"
          glowColor="rgba(245,158,11,0.12)"
          bobDuration={15}
          className="right-[10%] md:right-[16%] top-[10%] md:top-[14%]"
        />

        {/* Sparkles (AI) — right, mid */}
        <FloatingIcon
          icon={Sparkles}
          delay={0.7}
          size={36}
          rotate={-15}
          color="rgba(34,211,238,0.08)"
          glowColor="rgba(6,182,212,0.12)"
          bobDuration={12}
          className="right-[3%] md:right-[7%] top-[45%] md:top-[48%]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6 md:mb-8"
          >
            <Circle className="h-2 w-2 fill-rose-500/80" />
            <span className="text-sm text-white/60 tracking-wide">
              {badge}
            </span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 md:mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300"
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          {children ? (
            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              {children}
            </motion.div>
          ) : (
            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                Crafting exceptional digital experiences through innovative
                design and cutting-edge technology.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Edge fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}

export { HeroGeometric };
