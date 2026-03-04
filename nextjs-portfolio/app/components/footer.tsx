function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform group-hover:translate-x-1"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="mt-20 mb-10 border-t pt-10 border-neutral-300 dark:border-neutral-700">
      <ul className="flex flex-col md:flex-row justify-center gap-4 text-sm text-neutral-600 dark:text-neutral-300">
        {[
          { label: 'RSS', href: '/' },
          { label: 'GitHub', href: '/' },
          { label: 'View Source', href: '/' },
        ].map((item, index) => (
          <li key={index}>
            <a
              className="group flex items-center hover:text-blue-500 transition-all"
              rel="noopener noreferrer"
              target="_blank"
              href={item.href}
            >
              <ArrowIcon />
              <span className="ml-2">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
        © {new Date().getFullYear()} — MIT Licensed · Built with ❤️ by Sudarshan Mestha
      </p>
    </footer>
  )
}
