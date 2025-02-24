// Helper function: count occurrences of a character in a string
function countChar(str, char) {
  return str ? (str.match(new RegExp(`\\${char}`, 'g')) || []).length : 0;
}

// Helper function: Extract SPF record from domain
async function getSPFRecord(domain) {
  try {
    const response = await fetch(`https://dns.google/resolve?name=${domain}&type=SPF`);
    const data = await response.json();
    return data?.Answer ? 1 : 0; // 1 if SPF record exists, 0 if not
  } catch {
    return 0;
  }
}

// Helper function: Extract ASN from IP (you can use a public IP-to-ASN API)
async function getASNFromIP(ip) {
  try {
    const response = await fetch(`https://ipinfo.io/${ip}/org?token=YOUR_API_TOKEN`);
    const data = await response.json();
    return data.asn ? 1 : 0; // Return ASN number or empty string
  } catch {
    return 0;
  }
}

// Helper function: Get the time domain was activated (using WHOIS service)
async function getDomainActivationTime(domain) {
  try {
    const response = await fetch(`https://whoisapi.com/whois/domain/${domain}?apiKey=YOUR_API_KEY`);
    const data = await response.json();
    return data?.domainInfo?.createdDate ? 1 : 0;
  } catch {
    return 0;
  }
}

// Helper function: Get domain expiration time
async function getDomainExpirationTime(domain) {
  try {
    const response = await fetch(`https://whoisapi.com/whois/domain/${domain}?apiKey=YOUR_API_KEY`);
    const data = await response.json();
    return data?.domainInfo?.expiresDate ? 1 : 0; // Return expiration date or empty string
  } catch {
    return 0;
  }
}

// Helper function: Count the number of IP addresses resolved for a domain
async function getResolvedIPs(domain) {
  try {
    const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
    const data = await response.json();
    return data?.Answer?.length || 0; // Return the number of resolved IPs
  } catch {
    return 0;
  }
}

// Helper function: Count the number of nameservers for a domain
async function getNameservers(domain) {
  try {
    const response = await fetch(`https://dns.google/resolve?name=${domain}&type=NS`);
    const data = await response.json();
    return data?.Answer?.length || 0; // Return the number of nameservers
  } catch {
    return 0;
  }
}

// Helper function: Count the number of MX (Mail Exchange) records for a domain
async function getMXRecords(domain) {
  try {
    const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
    const data = await response.json();
    return data?.Answer?.length || 0; // Return the number of MX records
  } catch {
    return 0;
  }
}

// Helper function: Get TTL (Time-to-Live) value for a hostname
async function getTTLForHostname(domain) {
  try {
    const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
    const data = await response.json();
    return data?.Answer?.[0]?.TTL || 0; // Return TTL or 0 if not available
  } catch {
    return 0;
  }
}

// Helper function: Check if the domain uses an SSL certificate (TLS)
async function checkTLSForDomain(domain) {
  try {
    const response = await fetch(`https://api.ssllabs.com/api/v3/analyze?host=${domain}`);
    const data = await response.json();
    return data?.status === 'READY' && data?.endpoints?.[0]?.details?.status === 'OK' ? 1 : 0;
  } catch {
    return 0;
  }
}

// Helper function: Check if there are redirects
async function checkRedirects(domain) {
  try {
    const response = await fetch(`https://redirectcheck.com/api/check?url=${domain}`);
    const data = await response.json();
    return data?.redirects?.length || 0;
  } catch {
    return 0;
  }
}

// Helper function: Check if the URL is indexed by Google
async function checkGoogleIndex(url) {
  try {
    const response = await fetch(`https://www.googleapis.com/customsearch/v1?q=${url}&key=YOUR_API_KEY`);
    const data = await response.json();
    return data?.searchInformation?.totalResults || 0;
  } catch {
    return 0;
  }
}

// Helper function: Check if a domain is indexed by Google
async function checkDomainGoogleIndex(domain) {
  try {
    const response = await fetch(`https://www.googleapis.com/customsearch/v1?q=site:${domain}&key=YOUR_API_KEY`);
    const data = await response.json();
    return data?.searchInformation?.totalResults || 0;
  } catch {
    return 0;
  }
}

// Helper function: Check if the URL is shortened
function isURLShortened(url) {
  const shortenedURLPatterns = [
    /bit\.ly/i, /goo\.gl/i, /t\.co/i, /tinyurl\.com/i, /ow\.ly/i, /is\.gd/i,
    /v\.gd/i, /su\.pr/i, /cli\.gs/i, /buff\.ly/i, /adf\.ly/i
  ];
  return shortenedURLPatterns.some(pattern => pattern.test(url)) ? 1 : 0;
}

// Extract features from the current URL and document
 function extractFeatures() {
  const url = window.location.href.trim();
  const urlObj = new URL(url);
  const domain = urlObj.hostname;
  const path = urlObj.pathname;
  const query = urlObj.search;
  const fragment = urlObj.hash;
  const documentContent = document.documentElement.innerHTML.trim();
  // Extracting additional features

  // const time_response = (documentContent.match(/https?:\/\//g) || []).length; // Example for time_response
  // const domain_spf = await getSPFRecord(domain);
  // const asn_ip = await getASNFromIP(urlObj.hostname); // Assuming hostname is an IP
  // const time_domain_activation = await getDomainActivationTime(domain);
  // const time_domain_expiration = await getDomainExpirationTime(domain);
  // const qty_ip_resolved = await getResolvedIPs(domain);
  // const qty_nameservers = await getNameservers(domain);
  // const qty_mx_servers = await getMXRecords(domain);
  // const ttl_hostname = await getTTLForHostname(domain);
  // const tls_ssl_certificate = await checkTLSForDomain(domain);
  // const qty_redirects = await checkRedirects(domain);
  // const url_google_index = await checkGoogleIndex(url);
  // const domain_google_index = await checkDomainGoogleIndex(domain);
  // const url_shortened = isURLShortened(url);

  const features = [
    // URL-based features
    countChar(url, '.'), // qty_dot_url
    countChar(url, '-'), // qty_hyphen_url
    countChar(url, '_'), // qty_underline_url
    countChar(url, '/'), // qty_slash_url
    countChar(url, '?'), // qty_questionmark_url
    countChar(url, '='), // qty_equal_url
    countChar(url, '@'), // qty_at_url
    countChar(url, '&'), // qty_and_url
    countChar(url, '!'), // qty_exclamation_url
    countChar(url, ' '), // qty_space_url
    countChar(url, '~'), // qty_tilde_url
    countChar(url, ','), // qty_comma_url
    countChar(url, '+'), // qty_plus_url
    countChar(url, '*'), // qty_asterisk_url
    countChar(url, '#'), // qty_hashtag_url
    countChar(url, '$'), // qty_dollar_url
    countChar(url, '%'), // qty_percent_url
    (url.match(/\.[a-z]{2,}$/i) || []).length, // qty_tld_url
    url.length, // length_url

    // Domain-based features
    countChar(domain, '.'), // qty_dot_domain
    countChar(domain, '-'), // qty_hyphen_domain
    countChar(domain, '_'), // qty_underline_domain
    countChar(domain, '/'), // qty_slash_domain
    countChar(domain, '?'), // qty_questionmark_domain
    countChar(domain, '='), // qty_equal_domain
    countChar(domain, '@'), // qty_at_domain
    countChar(domain, '&'), // qty_and_domain
    countChar(domain, '!'), // qty_exclamation_domain
    countChar(domain, ' '), // qty_space_domain
    countChar(domain, '~'), // qty_tilde_domain
    countChar(domain, ','), // qty_comma_domain
    countChar(domain, '+'), // qty_plus_domain
    countChar(domain, '*'), // qty_asterisk_domain
    countChar(domain, '#'), // qty_hashtag_domain
    countChar(domain, '$'), // qty_dollar_domain
    countChar(domain, '%'), // qty_percent_domain
    (domain.match(/[aeiou]/gi) || []).length, // qty_vowels_domain
    domain.length, // domain_length
    /^(?:\d{1,3}\.){3}\d{1,3}$/.test(domain) ? 1 : 0, // domain_in_ip
    /\b(server|client)\b/i.test(domain) ? 1 : 0, // server_client_domain

    // Directory-based features
    countChar(path, '.'), // qty_dot_directory
    countChar(path, '-'), // qty_hyphen_directory
    countChar(path, '_'), // qty_underline_directory
    countChar(path, '/'), // qty_slash_directory
    countChar(path, '?'), // qty_questionmark_directory
    countChar(path, '='), // qty_equal_directory
    countChar(path, '@'), // qty_at_directory
    countChar(path, '&'), // qty_and_directory
    countChar(path, '!'), // qty_exclamation_directory
    countChar(path, ' '), // qty_space_directory
    countChar(path, '~'), // qty_tilde_directory
    countChar(path, ','), // qty_comma_directory
    countChar(path, '+'), // qty_plus_directory
    countChar(path, '*'), // qty_asterisk_directory
    countChar(path, '#'), // qty_hashtag_directory
    countChar(path, '$'), // qty_dollar_directory
    countChar(path, '%'), // qty_percent_directory
    path.length, // directory_length

    // File-based features
    countChar(path, '.'), // qty_dot_file
    countChar(path, '-'), // qty_hyphen_file
    countChar(path, '_'), // qty_underline_file
    countChar(path, '/'), // qty_slash_file
    countChar(path, '?'), // qty_questionmark_file
    countChar(path, '='), // qty_equal_file
    countChar(path, '@'), // qty_at_file
    countChar(path, '&'), // qty_and_file
    countChar(path, '!'), // qty_exclamation_file
    countChar(path, ' '), // qty_space_file
    countChar(path, '~'), // qty_tilde_file
    countChar(path, ','), // qty_comma_file
    countChar(path, '+'), // qty_plus_file
    countChar(path, '*'), // qty_asterisk_file
    countChar(path, '#'), // qty_hashtag_file
    countChar(path, '$'), // qty_dollar_file
    countChar(path, '%'), // qty_percent_file
    path.length, // file_length

    // Parameter-based features
    countChar(query, '.'), // qty_dot_params
    countChar(query, '-'), // qty_hyphen_params
    countChar(query, '_'), // qty_underline_params
    countChar(query, '/'), // qty_slash_params
    countChar(query, '?'), // qty_questionmark_params
    countChar(query, '='), // qty_equal_params
    countChar(query, '@'), // qty_at_params
    countChar(query, '&'), // qty_and_params
    countChar(query, '!'), // qty_exclamation_params
    countChar(query, ' '), // qty_space_params
    countChar(query, '~'), // qty_tilde_params
    countChar(query, ','), // qty_comma_params
    countChar(query, '+'), // qty_plus_params
    countChar(query, '*'), // qty_asterisk_params
    countChar(query, '#'), // qty_hashtag_params
    countChar(query, '$'), // qty_dollar_params
    countChar(query, '%'), // qty_percent_params
    query.length, // params_length
    /[a-z0-9]+\.([a-z]{2,})\//.test(query) ? 1 : 0, // tld_present_params
    countChar(query, '&'), // qty_params

    // Other features
    /mailto:/i.test(query) ? 1 : 0, // email_in_url
    time_response = 0, 
  domain_spf = 0, 
  asn_ip = 0, 
  time_domain_activation = 0, 
  time_domain_expiration = 0, 
  qty_ip_resolved = 0, 
  qty_nameservers = 0, 
  qty_mx_servers = 0, 
  ttl_hostname = 0, 
  tls_ssl_certificate = 0, 
  qty_redirects = 0, 
  url_google_index = 0, 
  domain_google_index = 0, 
  url_shortened = 0,
  ];

  return features;
}

// Send extracted features to the background script
chrome.runtime.sendMessage({ action: 'analyze_url', data: { features: extractFeatures() } }, (response) => {
  if (response && response.prediction !== undefined) {
    console.log('Phishing Prediction:', response.prediction);
  }
});
