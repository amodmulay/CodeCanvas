
"use client";

import Link from "next/link";
import Image from "next/image";
import { Plane, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-auto">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Plane className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Panasonic Avionics</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Products</Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Solutions</Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link>
        </nav>
        <Link href="/login">
            <Button variant="outline">Sign In</Button>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center pt-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[1fr_550px] xl:gap-24">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  How <span className="text-primary">product</span> & <span className="text-primary">engineering</span> teams work together with AI
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Our platform handles the code while you focus on your vision, letting you create and launch applications directly from your IDE or browser.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/login">
                  <Button size="lg" className="w-full min-[400px]:w-auto">
                    Initialise Development Environment
                    <Code className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              src="https://www.panasonic.aero/hs-fs/hubfs/00PAC%20-%20Panasonic%20Avionics/Home/Astrova-04.jpg?width=1920&height=1080&name=Astrova-04.jpg"
              alt="Hero"
              width={600}
              height={400}
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              data-ai-hint="inflight entertainment system"
            />
          </div>
        </div>
      </main>

      <footer className="py-12">
        <div className="container text-center">
            <p className="text-lg font-semibold text-muted-foreground">
              Trusted by the world's leading airlines and innovators
            </p>
        </div>
      </footer>
    </div>
  );
}
