import Layout from '../components/layout';
import FeaturedLaptops from '../components/featuredLaptops';
import Banner from '../components/banner'
import Faq from '../components/faq';
import Brands from '../components/brandList';
import ReviewCarousel from '../components/googleReview'
import MediaReviews from '../components/mediaReviews';


export default function Home(){
 return(
   <>
    <Layout>
      <Banner/>
      <FeaturedLaptops/>
      <MediaReviews/>
      <ReviewCarousel/>
      <Brands />
      <Faq />
    </Layout>
    
    </>
    )
}
