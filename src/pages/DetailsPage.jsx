import {Badge, Box, CircularProgress, Container, Flex, Heading, Image, Text} from "@chakra-ui/react";
import {useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import {fetchCredits, fetchDetails, fetchVideos, imgPath, imgPathOriginal} from "../services/api.js";
import {
    Button,
    CalendarIcon,
    CheckCircleIcon,
    CircularProgressLabel,
    SmallAddIcon,
    Spinner, TimeIcon
} from "@chakra-ui/icons";
import {minsToHours, ratingColor, ratingToPercentage} from "../uitlis/helper.js";
import VideoComponent from "../components/VideoComponent.jsx";


const DetailsPage = () => {

    const router = useParams();
    const { type,id } = router;
    const [loading, setLoading] = useState(true)
    let [details, setDetails] = useState({})
    const [casts,setCasts] = useState([])
    const [trailer, setTrailer] = useState(null)
    const [videos,setVideos] = useState([]);

    const [watchList, setWatchList] = useState([]);
    const [isInWatchlist, setIsInWatchlist] = useState(false);


    const toggleWatchList = () => {
        if (isInWatchlist) {
            setWatchList((prev) => {
                const updatedWatchlist = prev.filter((movieId) => movieId !== details.id)
                //remove and update local storage if the list is there
                localStorage.setItem("watch_list", JSON.stringify(updatedWatchlist));
                return updatedWatchlist;
            })

        } else {
            setWatchList((prev) => {
                const updatedWatchList = [...prev, details.id];
                //update local storage if the list is not there
                localStorage.setItem("watch_list", JSON.stringify(updatedWatchList));
                return updatedWatchList;
            })
        }

        setIsInWatchlist(!isInWatchlist); // set it true
    }
    //retrieve data from local storage and don't need dependency since we just want to retrieve the initial value
    useEffect(() => {
        const retrieveWatchList = JSON.parse(localStorage.getItem("watch_list")) || [];
        setWatchList(retrieveWatchList);
        }, []);

    useEffect(()=>{
        setIsInWatchlist(watchList.includes(details.id))
    },[details.id, watchList]) // by checking the watchlist it prevents from duplicating the list and by id it keeps the UI syn with the correct list

    // useEffect(()=>{
    //    fetchDetails(type,id)
    //        .then((res)=>{
    //            setDetails(res)
    //        console.log(res,'res')
    //    }).catch(err=>{
    //        console.log(err,'err')
    //    }).finally(()=>{
    //     setLoading(false);
    //    })
    //
    // },[type,id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [detailsData,creditsData, vidoesData] = await Promise.all([
                    fetchDetails(type, id),
                    fetchCredits(type,id),
                    fetchVideos(type,id)
                ])
                setDetails(detailsData)
                setCasts(creditsData.cast)

                const trailer_video = vidoesData?.results?.find((video)=> video.type === "Trailer")
                setTrailer(trailer_video)

                const videos = vidoesData?.results?.filter((video)=> video.type !== "Trailer")
                setVideos(videos);

            }
            catch (err){
                console.log(err, "error")
            }
            finally {
                setLoading(false)
            }
        }
        fetchData()
    },[type,id])

    // console.log(videos,"videos")
    // console.log(trailer,"trailer")
    console.log(details)

if (loading){
    return (
        <Flex justifyContent={"center"} >
            <Spinner size={"xl"} color={"red"}/>
        </Flex>

    )
}

let title = details?.title || details?.name;
const releaseDate = type === "tv" ? details?.first_air_date : details?.release_date;

    return (
        <Box>
            <Box
            background = {`linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.8)), url(${imgPathOriginal}/${details?.backdrop_path})`}
            backgroundRepeat={"no-repeat"}
            backgroundSize={"cover"}
            backgroundPosition={"center"}
            w={"100%"}
            h={{base:"auto" , md:"500px"}}
            py= {"2"}
            display={"flex"}
            alignItems={"center"}
            zIndex={-1}

            >
                <Container maxW={"container.xl"}>
                    <Flex  alignItems={"center"} gap = "10" flexDirection={{base:"column",md:"row"}}>

                    <Image src={`${imgPath}/${details?.poster_path}`}  height={"450px"}/>
                        <Box>
                            <Heading as="h2" fontSize={"3xl"} textTransform={"uppercase"}>
                                {title} {" "}
                               <Text as = "span" fontStyle={'normal'} color={ "gray.400"}>{ new Date(releaseDate).getFullYear() }</Text>
                            </Heading>

                         <Flex alignItems={'center'} gap={"4"} mb={"5"} mt ={"1"}>
                             <Flex alignItems ={"center"}>
                                 <CalendarIcon mr={"4"} color={"gray.400"}/>
                                 <Text fontSize={"sm"} >
                                     { new Date(releaseDate).toLocaleDateString("en-AU") } (AU)
                                 </Text>
                                 { type ==="movie" && (
                                     <Flex alignItems={"center"} >
                                         <TimeIcon ml={5} mr={1} color={"gray.400"} />
                                         <Text fontSize={"sm"} fontStyle={"italic"}> {minsToHours(details.runtime)} </Text>
                                     </Flex>
                                 )}
                             </Flex>
                         </Flex>
                            <Flex alignItems={"center"} gap={4}>
                                <CircularProgress
                                    value={ ratingToPercentage(details?.vote_average)}
                                    bg = {"gray.800"}
                                    borderRadius={"full"}
                                    p = {"0.5"}
                                    size = {"70px"}
                                    color = {ratingColor(details?.vote_average)}
                                    thickness={"6px"}
                                >
                                    <CircularProgressLabel fontSize={"lg"}>
                                        <Box as="span">
                                            {ratingToPercentage(details?.vote_average)}
                                            <Box as="span" fontSize="10px" verticalAlign="super">
                                                %
                                            </Box>
                                        </Box>
                                    </CircularProgressLabel>
                                </CircularProgress>
                                <Text display={{base:"none", md:"initial"}}> User Score</Text>

                                { isInWatchlist? (
                                    <Button
                                        leftIcon={<CheckCircleIcon/>}
                                        colorScheme={"green"}
                                        variant={"ghost"}
                                        onClick={toggleWatchList}>
                                        In Watchlist
                                    </Button>
                                ):(
                                    <Button
                                        leftIcon={<SmallAddIcon/>}
                                        variant={"outline"}
                                        onClick={toggleWatchList}>
                                        Add to watchList
                                    </Button>
                                            )
                                }


                            </Flex>
                            <Text color = {"gray.400"} fontSize={"sm"} fontStyle={"italic"} my={"5"}>
                                {details?.tagline}
                            </Text>
                            <Heading fontSize={"xl"} mb={3}> Overview</Heading>
                            <Text fontSize={"md"} mb={3}> {details?.overview}</Text>
                            <Flex mt={6} gap={2}>
                                {details?.genres?.map((genre => (
                                    <Badge key={genre.id} p={1}> {genre.name} </Badge>
                                )))}
                            </Flex>


                        </Box>

                    </Flex>

                </Container>
            </Box>

            <Container maxW={'container.xl'} pb={10} >
                <Heading as="h2" fontSize={"md"} textTransform={"uppercase"} mt={10}> Cast </Heading>
                    <Flex mt={"5"} mb={10} overflowX={"scroll"} gap={5}>
                        {casts?.length === 0 && <Text> No cast found</Text>}
                        {casts && casts.map((cast)=> (
                            <Box key={cast.id} minW={"150px"}  p={2} textAlign={"center"} >
                                <Image
                                    borderRadius="3px"
                                    src={`${imgPath}/${cast?.profile_path}`}
                                    mx="auto"
                                    mb="1"
                                />
                                <Text  fontWeight="bold" fontSize="md" >{cast.name}</Text>
                                <Text fontSize="sm" color="gray.500">{cast.character}</Text>
                            </Box>
                        ))}
                    </Flex>
                <Heading as="h2" fontSize={"md"} textTransform={"uppercase"} mt={10}> Videos </Heading>
                <Box display={"flex"} justifyContent={"center"} alignItems="center" mt={5} mb={10}>
                <VideoComponent id={trailer?.key} small={false}/>
                </Box>
                <Flex mt={5} mb={10} overflowX={"scroll"} gap={5}>
                    {videos && videos.map((video)=> (
                        <Box key = {video.id} minW={"300"}>
                            <VideoComponent id={video.key} />
                            <Text fontSize={"sm"} fontWeight={"bold"} noOfLines={2}> {video.name} </Text>
                        </Box>
                    ))}
                </Flex>

            </Container>
        </Box>


    )
}

export default DetailsPage