// IMPORT: DATA + COMPONENTS

import { Gallery } from "./components/gallery/Gallery.js";
import { Services } from "./components/services/Services.js";
import { portfolioData } from "./data/portfolioData.js";
import { servicesData } from "./data/servicesData.js";


// CODE EXECUTION

/* HEADER START */
/* HEADER END */

/* HERO START */
/* HERO END */

/* ABOUT ME START */
/* ABOUT ME END */

/* SERVICES START */
new Services('#services_block', servicesData);
/* SERVICES END */

/* PORTFOLIO START */
new Gallery('#portfolio_gallery_block', portfolioData);
/* PORTFOLIO END */

/* TESTIMONIALS START */
/* TESTIMONIALS END */

/* ACHIEVEMENTS START */
/* ACHIEVEMENTS END */

/* BLOG START */
/* BLOG END */

/* CONTACT US START */
/* CONTACT US END */

/* FOOTER START */
/* FOOTER END */