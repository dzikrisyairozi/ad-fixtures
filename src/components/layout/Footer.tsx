import React from "react";
import {
  FaYoutube,
  FaLinkedin,
  FaPinterest,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import UnstyledLink from "@/components/links/UnstyledLink";
import { useTranslations } from 'next-intl';

const socialLinks = [
  {
    icon: FaYoutube,
    href: "https://www.youtube.com/user/ADFixtures",
    hoverColor: "hover:text-[#FF0000]",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/company/adfixtures/",
    hoverColor: "hover:text-[#0A66C2]",
  },
  {
    icon: FaPinterest,
    href: "https://www.pinterest.de/adfixtures/",
    hoverColor: "hover:text-[#BD081C]",
  },
  {
    icon: FaFacebook,
    href: "https://www.facebook.com/adfixtures.tw",
    hoverColor: "hover:text-[#1877F2]",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/adfixturesinc/",
    hoverColor: "hover:text-[#E4405F]",
  },
  {
    icon: FaTwitter,
    href: "https://x.com/AD_Fixtures",
    hoverColor: "hover:text-[#1DA1F2]",
  },
];

export default function Footer() {
    const t = useTranslations('Footer');
    const currentYear = new Date().getFullYear();
  
    const footerLinks = [
      {
        title: t('discoverUs'),
        links: [
          { label: t('ourStory'), href: "/our-story" },
          { label: t('brandPartners'), href: "/brand-partners" },
          { label: t('blog'), href: "/blog" },
          { label: t('giftVoucher'), href: "/gift-voucher" },
        ],
      },
      {
        title: t('customerServices'),
        links: [
          { label: t('contactUs'), href: "/contact" },
          { label: t('faqs'), href: "/faqs" },
          { label: t('warranty'), href: "/warranty" },
          { label: t('ourGuarantee'), href: "/guarantee" },
          { label: t('returnPolicy'), href: "/return-policy" },
        ],
      },
      {
        title: t('legal'),
        links: [
          { label: t('termsOfService'), href: "/terms-of-service" },
          { label: t('termsAndConditions'), href: "/terms-and-conditions" },
          { label: t('termsOfWebsiteUse'), href: "/website-terms" },
          { label: t('privacyPolicy'), href: "/privacy-policy" },
          { label: t('accessibilityStatement'), href: "/accessibility" },
        ],
      },
      {
        title: t('commercial'),
        links: [
          { label: t('distributionPartners'), href: "/distribution-partners" },
          { label: t('volumeDiscounts'), href: "/volume-discounts" },
          { label: t('wholesaleInquiries'), href: "/wholesale" },
        ],
      },
    ];
  
    return (
      <footer className="bg-[#141414] text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="lg:w-1/3 mb-8 lg:mb-0">
              <h3 className="text-xl font-bold mb-4">{t('companyName')}</h3>
              <div className="flex flex-col space-y-2">
                <a
                  href="mailto:info@adfixtures.com.tw"
                  className="flex items-center hover:text-gray-300 transition-colors"
                >
                  <MdEmail className="mr-2" /> info@adfixtures.com.tw
                </a>
                <a
                  href="tel:+886423510528"
                  className="flex items-center hover:text-gray-300 transition-colors"
                >
                  <MdPhone className="mr-2" /> +886 4 2351 0528
                </a>
                <a
                  className="flex items-start hover:underline"
                  href="https://maps.app.goo.gl/heHxW3yi8BRDTWcp9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdLocationOn className="mr-2 mt-1 flex-shrink-0" />
                  {t('address')}
                </a>
              </div>
            </div>
            <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {footerLinks.map((column, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
                  <ul className="space-y-2">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <UnstyledLink
                          href={link.href}
                          className="hover:text-gray-300 transition-colors"
                        >
                          {link.label}
                        </UnstyledLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 md:mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0 text-sm text-center md:text-left">
                © {currentYear} {t('companyName')}. {t('allRightsReserved')}
              </div>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`text-white ${social.hoverColor} transition-colors`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
