import './category-description.styles.scss';

type DescriptionKeys =
  | 'hats'
  | 'jackets'
  | 'sneakers'
  | 'womens'
  | 'mens'
  | 'default';

const descriptions: Record<DescriptionKeys, JSX.Element> = {
  hats: (
    <div className="description-container">
      <h3 className="phrase">Finishing Touch to Your Style</h3>
      <span className="phrase">
        Step up your fashion game with our collection of hats, where style meets
        functionality.{' '}
      </span>
      <span className="phrase">
        Whether you're shielding yourself from the sun or adding a statement
        piece to your outfit, our selection has something for everyone.{' '}
      </span>
      <span className="phrase">
        From classic fedoras and chic berets to cozy beanies and trendy
        snapbacks, each hat is crafted with care to complement your unique look.{' '}
      </span>
      <span className="phrase">
        Discover the perfect accessory to elevate any ensemble and express your
        individuality with flair.
      </span>
    </div>
  ),
  jackets: (
    <div className="description-container">
      <h3 className="phrase">Your Ultimate Layer of Style</h3>
      <span className="phrase">
        Elevate your wardrobe with our diverse range of jackets, designed to
        keep you stylish and comfortable in any season.{' '}
      </span>
      <span className="phrase">
        From sleek leather jackets that exude confidence to cozy parkas that
        fend off the chill, our collection is crafted to suit every occasion and
        personality.{' '}
      </span>
      <span className="phrase">
        Explore timeless denim, sophisticated blazers, and versatile bombers,
        each piece a perfect blend of fashion and functionality.{' '}
      </span>
      <span className="phrase">
        Wrap yourself in a jacket that not only protects but also enhances your
        look, making every outfit a standout.
      </span>
    </div>
  ),
  sneakers: (
    <div className="description-container">
      <h3 className="phrase">Step into Style and Comfort</h3>
      <span className="phrase">
        Unleash your stride with our dynamic collection of sneakers, where
        comfort meets cutting-edge design.{' '}
      </span>
      <span className="phrase">
        Whether you're hitting the gym, strolling through the city, or making a
        fashion statement, our sneakers are crafted to support every step.{' '}
      </span>
      <span className="phrase">
        Discover everything from sleek, minimalist designs to bold, eye-catching
        patterns that express your unique style.{' '}
      </span>
      <span className="phrase">
        With top-tier materials and innovative technology, our sneakers offer
        the perfect blend of performance and aesthetics, so step up your
        footwear game and experience the ultimate in style and comfort.
      </span>
    </div>
  ),
  womens: (
    <div className="description-container">
      <h3 className="phrase">Embrace Your Elegance</h3>
      <span className="phrase">
        Discover a world of elegance and empowerment with our exclusive women's
        fashion collection.{' '}
      </span>
      <span className="phrase">
        From timeless classics to the latest trends, our selection is designed
        to celebrate every woman's unique style and grace.{' '}
      </span>
      <span className="phrase">
        Explore chic dresses, versatile tops, sophisticated outerwear, and more,
        each piece crafted with attention to detail and quality.{' '}
      </span>
      <span className="phrase">
        Whether you're dressing for a special occasion, the office, or a casual
        day out, our curated collection offers the perfect ensemble to reflect
        your individuality.
      </span>
    </div>
  ),
  mens: (
    <div className="description-container">
      <h3 className="phrase">Define Your Style</h3>
      <span className="phrase">
        Step into the realm of refined fashion with our men's collection, where
        sophistication meets versatility.{' '}
      </span>
      <span className="phrase">
        Whether you're dressing for success, leisure, or adventure, our range
        offers everything you need to define your style.{' '}
      </span>
      <span className="phrase">
        Explore sharp suits, casual wear, rugged outerwear, and essential
        accessories, all crafted with impeccable quality and design.{' '}
      </span>
      <span className="phrase">
        From classic staples to contemporary trends, each piece is selected to
        enhance your wardrobe and express your personality.
      </span>
    </div>
  ),
  default: (
    <div className="description-container">
      <span>Choose a category </span>
      <span>to see the description.</span>
    </div>
  ),
};

type CategoryDescriptionProps = {
  category: string;
};

const CategoryDescription = ({ category }: CategoryDescriptionProps) => {
  const description =
    descriptions[category as DescriptionKeys] || descriptions.default;

  return <>{description}</>;
};

export default CategoryDescription;
