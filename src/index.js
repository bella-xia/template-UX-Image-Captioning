import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  "type": "service_account",
  "project_id": "ux-image-captioning",
  "private_key_id": "69392d7896dad6e24d0a53244c8cefd72fefa6f9",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyXet7LDoyS56J\nCmidVRPHgmqIFUg0nDY80kCVAH8xG+o1E/LBQKG4+/ieviYtZtsfffb6g8UyhDs4\nxTTKmALCx0walUP4lP1ck747kYZXRvhN2nVMj3mNx1xjChS9PxvUeKDE/zdiCRdi\n/PYWG4XRmvoVYHs3b9H6cv9GmQKupNiaye9dPsw/sYWPNWI+/IWWvPQUtLDlxWt5\n1bXGUoq8wwkdARlbR27dtNYOu63mMuT8uon6RleErajHPo8Vxc6Ir4ULxjgbZQCC\nWqZVTkeTuI/VIIyiehU8GZWUSUcUMLP85S/teqLiPgshOH3i8yv6x6Hk0dy3qs1X\nYk8AOR8FAgMBAAECgf8uKKAIACoPWgJs9ISeMqYru1RWYyuMceCXXNHZvYcs7kxt\n7/uih1dSx+JPMmYu2a9bNv3zVqZxrEanKmG/DBeq0GiheH9elS/8BT/1qnNZosQf\nYal5ZqfOSQlfl/xF/U72bUEtud5bQH8M3unQTs8Sr0iIv68jaYytg5UMcAyBpTeK\nl3G/g2v354uO3vlkn5xArS3hA73vAQfEK8UQWqVkkTEPNNk5Bvm4S/Jmzkc3k/US\nhnyve0HWsxmB/ZjXkDxWA1QsUvI76Gup9gD5blxZYTwsCucgFLLL6jzdq7df7oYO\nrxoPpNMlVctEekyrHn6p6WthqWW3I07/Ocws/WkCgYEA+JjOyOnQOWPagYMAfup1\nQuDDeEG+k29nz7UKhyAn/BCQGqrSnSLdrP8AN7RBdXlbcd9AEv5pf1wrv7KNR4iv\naSDc82tEAEgPRICH7WwpSLzRfgYqtyWfJp+5DMlAZGhYObaEDw3smSYkVZOd3rTE\n1WLTmEd2cRiNs9e7AkB/SW0CgYEAt621ppZfbUD6tPotCPOME9qKpxTedomzuaMr\npYe9jMCgu7kYn0VzniM1bFHF17ulgf2qiX1u8AnC35XK9R5W0f2QPdQVj4LAXgYl\nJ0n/9Q/vcEebs/5eBzxNFL/LtRd4RDgNbyQpC4NzyHoy/zgn6U3t64AP9UYaG+Af\n4eY5BPkCgYEAhdgX9XpVfqCxY2t519s5+SD0fQnAprajiOQrX+dDP+ZW/9SbArlj\n6qF8p4EogSwuvNd7Mv7BJC4m69YhVLNV5d8otvI4sYIankIpbP4AGEZ48EY3t1XN\nI0l5o1WzkpvPbHtFDKntieNMSrrok6B2HYFQ9Tr8nRWgLYToDeVV4t0CgYEAnxAN\niRAb348wDV3BdkkC+4Z8ICkQZfLl81L8z0J3wdZm22p1iigo8b9n2kAOZr6Xm7TC\n5IH9el3Zpqofspntcbh2GzT43ujKEiKcNiP9RongPomkqwETCI0N63QUwuRqQBmS\neLcF3HSf5fL9CsvktEPKT/D84NkubwluUsB+jHECgYEAg8GZVP0d27TObQUnGP7y\n7R4B6nL6Qr/uCeTrTvd1bnWAf2y3dmhr8X175OptNJjKiDWqtx6ENWP8KrieVsw/\ndDlfxvfwRGFrizIRkgDUDvCb0KULjxBNrHXyqUNgaE4FyK2feE9vCF0fH1J89sgd\nL14NgJ2iDsJRaI16lbN2tSg=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-nynr5@ux-image-captioning.iam.gserviceaccount.com",
  "client_id": "107695022409347262785",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-nynr5%40ux-image-captioning.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}


const app = initializeApp(firebaseConfig);

ReactDOM.render(
      <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
