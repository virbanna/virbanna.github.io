/* Edit this file to update project details. Sources are listed in CONTENT-SOURCES.md. */
window.PORTFOLIO = {
  name: 'Vikas Singh Rathore',
  email: 'vikassrathore123@gmail.com',
  github: 'https://github.com/virbanna',
  linkedin: 'https://www.linkedin.com/in/vikassrathore/',
  projects: [
    {
      id: 'ecommerce',
      number: '01',
      category: 'analytics',
      categoryLabel: 'Business intelligence',
      title: 'Madhav Ecommerce Sales',
      description: 'A Power BI dashboard that brings sales, profit, customers, and product performance into one view.',
      tags: ['Power BI', 'DAX', 'Power Query', 'CSV'],
      repository: 'https://github.com/virbanna/Ecommerce-sales-deshboard',
      image: 'assets/ecommerce-dashboard-detail.png',
      problem: 'Transaction files contain the answers to business questions, but those answers are difficult to see in rows of raw data.',
      approach: 'Cleaned and transformed CSV data with Power Query, built the report in Power BI, and used DAX measures to surface sales, profit, and average order value. Quarter and category slicers let viewers explore the report.',
      features: [
        'Sales and profit KPIs with quarter and category filters',
        'State, customer, and product category breakdowns',
        'Monthly profit trends and sub-category comparisons',
        'Payment mode distribution and contextual tooltips'
      ],
      outcome: 'An interactive report for exploring regional performance, product mix, and seasonal profit patterns.',
      note: 'The repository identifies this as a learning project using a demonstration dataset. The images below are from the original Power BI report.',
      secondaryImage: 'assets/ecommerce-dashboard.png'
    },
    {
      id: 'stock',
      number: '02',
      category: 'automation',
      categoryLabel: 'Operations / Progressive web app',
      title: 'ARTIME Stock',
      description: 'A phone-friendly stock app that captures entries offline and syncs them to Google Sheets.',
      tags: ['JavaScript', 'Google Sheets', 'PWA', 'Offline sync'],
      repository: 'https://github.com/virbanna/Stockmanagement-',
      problem: 'Stock movements need to be recorded where the work happens, including when the internet connection is unreliable.',
      approach: 'Built a responsive JavaScript app with installable PWA support, cached stock data, a local entry queue, and Google Sheets synchronization through an Apps Script connection.',
      features: [
        'Stock-in and stock-out entries with supplier and reference fields',
        'Offline entry queue with retry and sync status',
        'Low-stock alerts, item search, and category views',
        'Stock movement reports and grouped production entries'
      ],
      outcome: 'An inventory workflow designed for mobile use, with entries kept on the device until they can be synchronized.',
      note: 'The portfolio shows the app workflow. The repository contains the frontend; a configured Google Sheets and Apps Script connection is needed for live data.'
    },
    {
      id: 'expense',
      number: '03',
      category: 'automation',
      categoryLabel: 'Finance / Progressive web app',
      title: 'Expense Tracker',
      description: 'A focused, two-step expense entry app connected to Google Sheets through Google Apps Script.',
      tags: ['HTML & CSS', 'JavaScript', 'Apps Script', 'PWA'],
      repository: 'https://github.com/virbanna/Expeance-Tracker',
      problem: 'Small everyday expenses are easy to miss when recording them takes too many steps.',
      approach: 'Created a mobile interface that starts with the amount, then collects a category, date, and optional remarks. The app submits entries to an Apps Script endpoint and includes an installable web app manifest.',
      features: [
        'Amount-first entry with positive amount validation',
        'Preset categories and a custom category option',
        'Date and optional remarks for each expense',
        'Google Sheets submission and home-screen installation'
      ],
      outcome: 'A compact expense capture workflow built around quick entry on a phone.',
      note: 'The repository name is Expeance-Tracker. The app title is Expense Tracker. A configured Apps Script connection is required to save expenses.'
    }
  ]
};
