import * as React from 'react';
import { ICarouselSlickProps } from './ICarouselSlickProps';
import { escape } from '@microsoft/sp-lodash-subset';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { SPService } from '../../../Service/Service';
import styles from "./Carousel.module.scss";


export interface IReactCarouselWpState {
  //bannerCardData : any[]
  listItems: any[];
}

const settings = {
  centerMode: false,
  dots: false,
  infinite: true,
  lazyLoad: true,
  slidesToScroll: 1,
  slidesToShow: 1,
  arrows: false,
  autoplay: true,
  speed: 3000,
  pauseOnHover: false,
};


export default class CarouselSlick extends React.Component<ICarouselSlickProps, IReactCarouselWpState> {

  private SPService: SPService = null;
  public constructor(props:ICarouselSlickProps,state:IReactCarouselWpState){
    super(props);
    this.SPService = new SPService(this.props.context);
    this.getCarouselItems = this.getCarouselItems.bind(this);
    this.state ={
      //bannerCardData : []
      listItems: []
    }
  }
  
  public async getCarouselItems() {
    if (this.props.listName) {
      let carouselItems = await this.SPService.getListItems(
        this.props.listName
      );
      this.setState({ listItems: carouselItems });
    }}
      
    public componentDidMount() {
      this.getCarouselItems();
    }
  public render(): React.ReactElement<ICarouselSlickProps> {

    const {
      //bannerCardData
      listItems
    } = this.state
    
    return (
      <div  className={` ${styles.row}`}>
      <div className="col-12 col-md-6">
         <Slider {...settings}>
          {  
             listItems.map((item, i) => {
               
               return (
                 <div  className={styles.reactCarouselWp}>
                   <img src={item.ImageLink} />
                   {/* <h2>{item.Title}</h2> */}                   
                   {/* <p>{item.Description}</p>    */}
                 </div>
               )
             })
             }
         </Slider>
         </div>
       </div> 
 );
}
}
