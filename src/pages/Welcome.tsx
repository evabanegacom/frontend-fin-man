import { Stats, Business, Billing, CardDeal, Testimonials, Clients, CTA } from "./landing-page";
import styles from "./style";

const Welcome = () => (
  <div className="bg-primary w-full overflow-hidden">
    
    <div className={`bg-gray-900 ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth} bg-gray-900`}>
        <Stats />
        <Business />
        <Billing />
        <CardDeal />
        <Testimonials />
        <Clients />
        <CTA />
      </div>
    </div>
  </div>
);

export default Welcome;