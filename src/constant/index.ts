export interface NavigationItem {
  id: string
  text: string
  url?: string
  icon?: string,
  external?: boolean
  children?: NavigationItem[]
}

export type NavigationLeafItem = Omit<NavigationItem, 'children'>

export const DASHBOARD: Record<string, NavigationItem> = {
  'home': {
    id: 'sign-in',
    url: '/',
    text: 'navigation.home',
    icon: 'home',
  }
}

export const AUTH: Record<string, NavigationItem> = {
  'sign-in': {
    id: 'sign-in',
    url: '/sign-in',
    text: 'navigation.sign_in',
    icon: 'home',
  },
  'sign-up': {
    id: 'sign-up',
    url: '/sign-up',
    text: 'navigation.sign_up',
    icon: 'home',
  },
  'forgot-password': {
    id: 'forgot-password',
    url: '/forgot-password',
    text: 'navigation.forgot_password',
    icon: 'home',
  }
}

export const AFFILIATES_NAVIGATION: NavigationItem[] = [
  {
    id: 'manage',
    text: 'navigation.affiliates.groups.manage',
    children: [
      { id: 'affiliates-list', url: '/affiliates/list', text: 'navigation.affiliates.list' },
      { id: 'affiliates-managers', url: '/affiliates/managers', text: 'navigation.affiliates.managers' },
    ],
  },
  {
    id: 'billing',
    text: 'navigation.affiliates.groups.billing',
    children: [
      { id: 'open-balance', url: '/affiliates/billing/open-balance', text: 'navigation.affiliates.open_balance' },
      { id: 'settled-balance', url: '/affiliates/billing/settled-balance', text: 'navigation.affiliates.settled_balance' },
    ],
  },
  {
    id: 'tools',
    text: 'navigation.affiliates.groups.tools',
    children: [
      { id: 'coupons', url: '/affiliates/tools/coupons', text: 'navigation.affiliates.coupons' },
      { id: 'affiliates-postbacks', url: '/affiliates/tools/postbacks', text: 'navigation.affiliates.postbacks' },
    ],
  },
  {
    id: 'communication',
    text: 'navigation.affiliates.groups.communication',
    children: [
      { id: 'email-message', url: '/affiliates/communication/email-message', text: 'navigation.affiliates.email_message' },
      { id: 'popup-messages', url: '/affiliates/communication/popup-messages', text: 'navigation.affiliates.popup_messages' },
      { id: 'affiliates-tickets', url: '/affiliates/communication/tickets', text: 'navigation.affiliates.tickets' },
    ],
  },
]

export const OFFERS_NAVIGATION: NavigationItem[] = [
  {
    id: 'manage',
    text: 'navigation.offers.groups.manage',
    children: [
      { id: 'offer-list', url: '/offers/list', text: 'navigation.offers.list' },
      { id: 'offer-applications', url: '/offers/applications', text: 'navigation.offers.applications' },
      { id: 'smart-links', url: '/offers/smart-links', text: 'navigation.offers.smart_links' },
    ],
  },
]

export const REPORTS_NAVIGATION: NavigationItem[] = [
  {
    id: 'aggregated',
    text: 'navigation.reports.groups.aggregated',
    children: [
      { id: 'daily-report', url: '/reports/daily', text: 'navigation.reports.daily' },
      { id: 'overview-reports', url: '/reports/overview', text: 'navigation.reports.overview' },
      { id: 'report-builder', url: '/reports/builder', text: 'navigation.reports.builder' },
      { id: 'funnel-report', url: '/reports/funnel', text: 'navigation.reports.funnel' },
    ],
  },
  {
    id: 'granular',
    text: 'navigation.reports.groups.granular',
    children: [
      { id: 'clicks', url: '/reports/clicks', text: 'navigation.reports.clicks' },
      { id: 'conversions', url: '/reports/conversions', text: 'navigation.reports.conversions' },
    ],
  },
]

export const TOOLS_NAVIGATION: NavigationItem[] = [
  {
    id: 'automation',
    text: 'navigation.tools.groups.automation',
    children: [
      { id: 'alerts', url: '/tools/alerts', text: 'navigation.tools.alerts' },
      { id: 'payout-builder', url: '/tools/payout-builder', text: 'navigation.tools.payout_builder' },
      { id: 'traffic-control', url: '/tools/traffic-control', text: 'navigation.tools.traffic_control' },
      { id: 'webhooks', url: '/tools/webhooks', text: 'navigation.tools.webhooks' },
    ],
  },
  {
    id: 'logs',
    text: 'navigation.tools.groups.logs',
    children: [
      { id: 'activity-logs', url: '/tools/logs/activity', text: 'navigation.tools.activity_logs' },
      { id: 'postbacks-tracking-log', url: '/tools/logs/postbacks', text: 'navigation.tools.postbacks_log' },
      { id: 'conversion-error-log', url: '/tools/logs/conversion-errors', text: 'navigation.tools.conversion_error_log' },
    ],
  },
]

export const MARKETPLACES_NAVIGATION: NavigationItem[] = [
  { id: 'affiliates', url: '/marketplaces/affiliates', text: 'navigation.marketplaces.affiliates' },
  { id: 'influencers', url: '/marketplaces/influencers', text: 'navigation.marketplaces.influencers' },
  { id: 'agencies', url: '/marketplaces/agencies', text: 'navigation.marketplaces.agencies' },
  { id: 'managers', url: '/marketplaces/managers', text: 'navigation.marketplaces.managers' },
]

export const INTEGRATIONS_NAVIGATION: NavigationItem[] = [
  { id: 'popular-templates', url: '/integrations/popular-templates', text: 'navigation.integrations.popular_templates' },
  { id: 'custom-automations', url: '/integrations/custom-automations', text: 'navigation.integrations.custom_automations' },
]

export const SETTINGS_NAVIGATION: NavigationItem[] = [
  {
    id: 'general',
    text: 'navigation.settings.groups.general',
    icon: 'settings',
    children: [
      // { id: 'users', url: '/settings/general/users', text: 'navigation.settings.general.users' },
      // { id: 'branding', url: '/settings/general/branding', text: 'navigation.settings.general.branding' },
      // { id: 'offer-organization', url: '/settings/general/offer-organization', text: 'navigation.settings.general.offer_organization' },
      // { id: 'tags', url: '/settings/general/tags', text: 'navigation.settings.general.tags' },
      // { id: 'menu-customization', url: '/settings/general/menu-customization', text: 'navigation.settings.general.menu_customization' },
      { id: 'system', url: '/settings/system', text: 'navigation.settings.general.system' },
      { id: 'currencies', url: '/settings/currencies', text: 'navigation.settings.general.currencies' },
      // { id: 'terms-and-conditions', url: '/settings/general/terms-and-conditions', text: 'navigation.settings.general.terms_and_conditions' },
      // { id: 'privacy-policy', url: '/settings/general/privacy-policy', text: 'navigation.settings.general.privacy_policy' },
      // { id: 'data-anonymization', url: '/settings/general/data-anonymization', text: 'navigation.settings.general.data_anonymization' },
      // { id: 'dashboard-and-reports', url: '/settings/general/dashboard-and-reports', text: 'navigation.settings.general.dashboard_and_reports' },
      // { id: 'email-customization', url: '/settings/general/email-customization', text: 'navigation.settings.general.email_customization' },
      // { id: 'custom-internal-pages', url: '/settings/general/custom-internal-pages', text: 'navigation.settings.general.custom_internal_pages' },
    ],
  },
  {
    id: 'tracking',
    text: 'navigation.settings.groups.tracking',
    icon: 'map-pin',
    children: [
      { id: 'conversion-attribution', url: '/settings/tracking/conversion-attribution', text: 'navigation.settings.tracking.conversion_attribution' },
      { id: 'conversion-types', url: '/settings/tracking/conversion-types', text: 'navigation.settings.tracking.conversion_types' },
      { id: 'authorization', url: '/settings/tracking/authorization', text: 'navigation.settings.tracking.authorization' },
      { id: 'affiliates-tracking-links', url: '/settings/tracking/affiliates-tracking-links', text: 'navigation.settings.tracking.affiliate_tracking_links' },
      { id: 'direct-tracking', url: '/settings/tracking/direct-tracking', text: 'navigation.settings.tracking.direct_tracking' },
      { id: 'redirect-tracking', url: '/settings/tracking/redirect-tracking', text: 'navigation.settings.tracking.redirect_tracking' },
      { id: 'smart-links', url: '/settings/tracking/smart-links', text: 'navigation.settings.tracking.smart_links' },
      { id: 'fraud-prevention', url: '/settings/tracking/fraud-prevention', text: 'navigation.settings.tracking.fraud_prevention' },
      { id: 'quality-control', url: '/settings/tracking/quality-control', text: 'navigation.settings.tracking.quality_control' },
    ],
  },
  {
    id: 'affiliates',
    text: 'navigation.settings.groups.affiliates',
    icon: 'users',
    children: [
      { id: 'general', url: '/settings/affiliates/general', text: 'navigation.settings.affiliates.general' },
      { id: 'tiers', url: '/settings/affiliates/tiers', text: 'navigation.settings.affiliates.tiers' },
      { id: 'payment-methods', url: '/settings/affiliates/payment-methods', text: 'navigation.settings.affiliates.payment_methods' },
      { id: 'mlm', url: '/settings/affiliates/mlm', text: 'navigation.settings.affiliates.mlm' },
      { id: 'registration', url: '/settings/affiliates/registration', text: 'navigation.settings.affiliates.registration' },
      { id: 'data-visibility', url: '/settings/affiliates/data-visibility', text: 'navigation.settings.affiliates.data_visibility' },
      { id: 'affiliates-communication', url: '/settings/affiliates/communication', text: 'navigation.settings.affiliates.communication' },
      { id: 'affiliates-ticketing', url: '/settings/affiliates/ticketing', text: 'navigation.settings.affiliates.ticketing' },
      { id: 'affiliates-alerts', url: '/settings/affiliates/alerts', text: 'navigation.settings.affiliates.alerts' },
    ],
  },
  {
    id: 'integrations',
    text: 'navigation.settings.groups.integrations',
    icon: 'puzzle',
    children: [
      { id: 'integration-manuals', url: 'https://docs.example.com', text: 'navigation.settings.integrations.integration_manuals', external: true },
      { id: 'personal-tokens', url: '/settings/integrations/personal-tokens', text: 'navigation.settings.integrations.personal_tokens' },
      { id: 'payout-automation', url: '/settings/integrations/payout-automation', text: 'navigation.settings.integrations.payout_automation' },
      { id: 'crypto-payouts', url: '/settings/integrations/crypto-payouts', text: 'navigation.settings.integrations.crypto_payouts' },
      { id: 'anura', url: '/settings/integrations/anura', text: 'navigation.settings.integrations.anura' },
      { id: 'custom-smtp', url: '/settings/integrations/custom-smtp', text: 'navigation.settings.integrations.custom_smtp' },
    ],
  },
  {
    id: 'my-account',
    text: 'navigation.settings.groups.my_account',
    icon: 'user',
    children: [
      // { id: 'manage-subscription', url: 'https://billing.example.com', text: 'navigation.settings.my_account.manage_subscription', external: true },
      { id: 'company-details', url: '/settings/company-details', text: 'navigation.settings.my_account.company_details' },
      // { id: 'mfa', url: '/settings/my-account/multi-factor-authentication', text: 'navigation.settings.my_account.mfa' },
    ],
  },
]

export const SIDEBAR_NAVIGATION: NavigationItem[] = [
  {
    id: 'dashboard',
    url: '/',
    text: 'navigation.dashboard',
    icon: 'pie-chart',
  },
  {
    id: 'affiliates',
    url: '/affiliates',
    text: 'navigation.affiliates.title',
    icon: 'users',
    children: AFFILIATES_NAVIGATION,
  },
  {
    id: 'offers',
    url: '/offers',
    text: 'navigation.offers.title',
    icon: 'credit-card',
    children: OFFERS_NAVIGATION,
  },
  {
    id: 'reports',
    url: '/reports',
    text: 'navigation.reports.title',
    icon: 'trending-up',
    children: REPORTS_NAVIGATION,
  },
  {
    id: 'tools',
    url: '/tools',
    text: 'navigation.tools.title',
    icon: 'wrench',
    children: TOOLS_NAVIGATION,
  },
  {
    id: 'marketplaces',
    url: '/marketplaces',
    text: 'navigation.marketplaces.title',
    icon: 'store',
    children: MARKETPLACES_NAVIGATION,
  },
  {
    id: 'integrations',
    url: '/integrations',
    text: 'navigation.integrations.title',
    icon: 'puzzle',
    children: INTEGRATIONS_NAVIGATION,
  },
  {
    id: 'settings',
    url: '/settings',
    text: 'navigation.settings.title',
    icon: 'settings',
    children: SETTINGS_NAVIGATION,
  },
]
