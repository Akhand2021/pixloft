import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button'
import { RocketIcon, SparklesIcon, StarIcon, UsersIcon, LayoutTemplateIcon, GlobeIcon } from 'lucide-react'
import { motion } from 'framer-motion';

export default function WelcomeContent() {
    return (
      <div className="relative isolate overflow-hidden bg-slate-100 dark:bg-slate-900 py-24 sm:py-32 lg:px-0">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-transparent sm:text-6xl bg-gradient-to-r from-indigo-600 via-emerald-600 to-amber-600 bg-clip-text dark:from-indigo-400 dark:via-emerald-400 dark:to-amber-400">
              Craft Stunning Portfolios & Digital Products with Pixloft
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
              Pixloft empowers creators with beautiful templates, flexible layouts, and powerful integrations.
              Launch your site in minutes—no code required.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
  <Link href={route('templates')}>
    <button className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
      Browse Templates
    </button>
  </Link>

  <Link href={route('collections')}>
    <button className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
      View Collections
    </button>
  </Link>
</div>

          </div>
  
          {/* Features */}
          <div className="mt-24 grid max-w-xl grid-cols-1 gap-y-16 gap-x-8 text-center lg:max-w-none lg:grid-cols-3">
            {[
              {
                icon: <RocketIcon className="h-6 w-6" />,
                title: 'Lightning Fast Setup',
                text: 'Build your personal or product site in minutes with drag-and-drop layouts and components.',
                color: 'indigo',
              },
              {
                icon: <StarIcon className="h-6 w-6" />,
                title: 'Designed to Shine',
                text: 'Choose from stunning templates with pixel-perfect design and motion to wow your audience.',
                color: 'emerald',
              },
              {
                icon: <SparklesIcon className="h-6 w-6" />,
                title: 'Built for Creators',
                text: 'Whether you’re a designer, developer, or entrepreneur—Pixloft gives you the tools to thrive.',
                color: 'amber',
              },
            ].map(({ icon, title, text, color }) => (
              <div key={title} className="flex flex-col items-center">
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-${color}-100 text-${color}-600 dark:bg-${color}-900 dark:text-${color}-300`}>
                  {icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{text}</p>
              </div>
            ))}
          </div>
  
          {/* How It Works */}
          <div className="mt-32 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">How It Works</h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              We’ve made it ridiculously easy to launch your personal brand or product portfolio.
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-10">
              {[
                {
                  icon: <LayoutTemplateIcon className="h-6 w-6" />,
                  title: 'Choose a Template',
                },
                {
                  icon: <GlobeIcon className="h-6 w-6" />,
                  title: 'Customize & Deploy',
                },
                {
                  icon: <UsersIcon className="h-6 w-6" />,
                  title: 'Grow Your Audience',
                },
              ].map(({ icon, title }) => (
                <div key={title} className="flex flex-col items-center">
                  <div className="mb-4 rounded-full bg-slate-200 dark:bg-slate-700 p-4 text-indigo-600 dark:text-indigo-300">
                    {icon}
                  </div>
                  <h4 className="font-medium text-neutral-800 dark:text-white">{title}</h4>
                </div>
              ))}
            </div>
          </div>
  
         <div>
              
         </div>
        </div>
      </div>
    )
  }