import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Discord', icon: '/footer/discord.svg', href: '#' },
    { name: 'Telegram', icon: '/footer/telegram.svg', href: '#' },
    { name: 'GitHub', icon: '/footer/github.svg', href: '#' },
    { name: 'LinkedIn', icon: '/footer/linkedin.svg', href: '#' },
    { name: 'X', icon: '/footer/x.svg', href: '#' },
  ];

  return (
    <footer className='border-t border-gray-800 bg-black'>
      <div className='max-w px- sm:px- lg:px- py-8'>
        {/* Desktop Layout */}
        <div className='hidden items-start justify-between md:flex'>
          {/* Left side - Logo and Copyright */}
          <div className='flex flex-col space-y-4'>
            <Image
              src='/footer/logo.svg'
              alt='Boundless'
              width={120}
              height={40}
              className='mb-14 w-14'
            />
            <div className='text-sm text-gray-400'>
              © {currentYear} Boundless — Transparent, Community-Driven,
              Web3-Native Funding.
            </div>
          </div>

          {/* Right side - Links and Social Icons */}
          <div className='flex flex-col items-end space-y-6'>
            {/* Policy Links */}
            <div className='mb-14 flex space-x-8'>
              <Link
                href='/terms'
                className='text-sm text-gray-400 transition-colors hover:text-white'
              >
                Terms of Service
              </Link>
              <Link
                href='/privacy'
                className='text-sm text-gray-400 transition-colors hover:text-white'
              >
                Privacy Policy
              </Link>
            </div>

            {/* Social Icons */}
            <div className='flex space-x-4'>
              {socialLinks.map(social => (
                <>
                  <Link
                    key={social.name}
                    href={social.href}
                    className='transition-opacity hover:opacity-80'
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={24}
                      height={24}
                      className='h-6 w-6'
                    />
                  </Link>
                  <div className='h-6 w-0.5 bg-[#2B2B2B]'></div>
                </>
              ))}
              <Link href='#' className='transition-opacity hover:opacity-80'>
                <Image
                  src='/footer/gmail.svg'
                  alt='gmail'
                  width={24}
                  height={24}
                  className='h-6 w-24'
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className='flex flex-col items-center space-y-6 md:hidden'>
          {/* Logo */}
          <Image
            src='/footer/logo.svg'
            alt='Boundless'
            width={120}
            height={40}
            className='h-10 w-auto'
          />

          {/* Policy Links */}
          <div className='flex space-x-8'>
            <Link
              href='/terms'
              className='text-sm text-gray-400 transition-colors hover:text-white'
            >
              Terms of Service
            </Link>
            <Link
              href='/privacy'
              className='text-sm text-gray-400 transition-colors hover:text-white'
            >
              Privacy Policy
            </Link>
          </div>

          {/* Social Icons */}
          <div className='flex space-x-4'>
            {socialLinks.map(social => (
              <>
                <Link
                  key={social.name}
                  href={social.href}
                  className='transition-opacity hover:opacity-80'
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={24}
                    height={24}
                    className='h-6 w-6'
                  />
                </Link>
                <div className='h-6 w-0.5 bg-[#2B2B2B]'></div>
              </>
            ))}
            <Link href='#' className='transition-opacity hover:opacity-80'>
              <Image
                src='/footer/gmail.svg'
                alt='gmail'
                width={24}
                height={24}
                className='h-6 w-24'
              />
            </Link>
          </div>

          {/* Copyright */}
          <div className='text-center text-sm text-gray-400'>
            © {currentYear} Boundless — Transparent,
            <br />
            Community-Driven, Web3-Native Funding.
          </div>
        </div>
      </div>
    </footer>
  );
}
