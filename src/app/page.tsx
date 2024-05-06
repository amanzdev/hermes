import Image from "next/image";
import medicine from "@/images/undraw_medical_care_movn.svg";
import Link from "next/link";
import * as React from "react";

export default function Home() {
  return (
      <div className="h-screen flex flex-col">
        <header className="header">
          <div className="header__content">
            <div className="header__logo-container">
              <Link className="header__logo text-white" href="/">
                <Image
                    src="/logo.svg"
                    alt="Caduceus Logo"
                    className="dark:invert"
                    width={24}
                    height={24}
                    priority
                />
              </Link>
            </div>
            <nav className="header__aside">
              <div className="header__nav-container">
                <ul className="header__nav">
                  <li className="header__nav-item">
                    <Link href="/auth/login">Login</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center">
          <section className="hero">
            <h1 className="hero__title">
              <span>Welcome to the <strong className="strong">Hermes</strong> Project.</span>
            </h1>
            <div className="hero__container aspect-video">
              <Image src={medicine} alt="Hero image" className="w-2/3 mx-auto"/>
            </div>
            <p className="hero__body pt-4">
              <span>Building the next generation of Hospital Management Systems.</span>
            </p>
          </section>
        </main>
        <footer className="text-white relative">
          <nav
              className="flex items-center justify-between max-w-[600px] md:max-w-[800px] lg:max-w-[1440px] px-7 py-8 md:px-24 mx-auto">
            <Link href="https://amanz.my/kami" className="hover:underline" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-8"
                   viewBox="0 0 322.75 238.26">
                <path className="cls-2"
                      d="M322.75,206.52c-3.94,3.48-8.06,6.77-12.43,9.77-6.29,4.34-13.01,8.1-20.11,11.25-15.51,6.91-32.69,10.72-50.79,10.72-14.11,0-27.65-2.34-40.28-6.62-20.26-6.86-38.16-18.78-52.23-34.27-13.97,20.59-37.68,34.17-64.61,34.17-43.01,0-77.91-34.6-77.91-77.31,0-19.25,7.06-36.84,18.82-50.33l8.4-8.39c7.73-6.58,16.75-11.68,26.69-14.82-2.59,7.58-3.94,15.73-3.94,24.16,0,42.66,34.9,77.31,77.91,77.31,8.35,0,16.42-1.33,24-3.77,4.94-1.62,9.7-3.67,14.16-6.2l25.44-25.26c.24,.29,.53,.57,.82,.81,26.02,26.12,59.24,45.18,96.44,54,6.62,1.62,13.44,2.86,20.31,3.77,3.12,.38,6.19,.76,9.31,1h0Z"></path>
                <path className="cls-2"
                      d="M176.74,41.85l-49.56,49.2c-.56-.43-1.16-.82-1.76-1.22-14.84-14.77-32-27.27-50.92-36.87h-.03c-14.08-7.17-29.09-12.73-44.82-16.48-6.66-1.58-13.45-2.83-20.34-3.75-3.08-.39-6.19-.76-9.31-.99,3.94-3.49,8.08-6.78,12.46-9.77,6.29-4.34,13.02-8.12,20.11-11.25C48.07,3.81,65.27,0,83.35,0c13.42,0,26.3,2.1,38.39,6.02,.63,.16,1.26,.39,1.89,.59,20.11,6.81,37.93,18.62,51.91,33.94,.43,.43,.8,.86,1.19,1.28v.02Z"></path>
                <path className="cls-1"
                      d="M125.43,89.84c-12.32-8.16-27.16-12.93-43.13-12.93-8.38,0-16.46,1.32-24.02,3.78-9.9,3.16-18.95,8.26-26.67,14.83l42.87-42.56h.03c18.92,9.6,36.08,22.1,50.92,36.87h0Z"></path>
              </svg>
            </Link>
            <ul className="p-0 m-0 list-none flex items-center justify-between">
              <li>
                <Link className="inline-block text-sm leading-normal tracking-[.25px] hover:underline"
                      href="https://amanz.me/policies/privacy-policy" target="_blank">Privacy</Link>
              </li>
            </ul>
          </nav>
        </footer>
      </div>
  );
}
