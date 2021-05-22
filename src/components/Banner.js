import  {Carousel}  from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
function Banner() {
    const banner = [
        {
            url:'gi1'
        },
        {
            url:'6ff'
        },
        {
            url:'7ma'
        }
    ]
    return (
        <div className='relative'>
            <div className='absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20'/> 
            <Carousel
            autoPlay
            infiniteLoop
            showStatus={false }
            showIndicators = {false}
            showThumbs = {false}
            interval = {5000}
            >
                {
                    banner.map((b)=>{
                        return <div key={b.url}>
                            <img loading='lazy' src={`https://links.papareact.com/${b.url}`} alt=""/>
                        </div>
                    })
                }
                
            </Carousel>
           
        </div>
    )
}

export default Banner
