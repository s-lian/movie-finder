import {Box, Container, Flex, Menu} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import {useAuth} from "../context/useAuth.js";
import {Avatar, MenuButton, MenuItem, MenuList, SearchIcon} from "@chakra-ui/icons";

const Navbar = () => {
    const {user,logOut} = useAuth()
    console.log(user)
    // const logInHandler = async () => {
    //     try{
    //         await signInWithGoogle();
    //         console.log("Sign In successfully");
    //     }catch(error){
    //         console.log("error",error)
    //     }
    // }
    return (
        <Box py="4" mb="2">
            <Container maxW={"container.xl"}>
                <Flex justifyContent={"space-between"} >
                    <Link to="/">
                        <Box fontSize={"2xl"} fontWeight={"bold"} fontStyle={"italic"} color={"red"} letterSpacing={"widest"} fontFamily={"mono"}>
                            Movie-Finder
                        </Box>

                    </Link>

                    {/* desktop */}
                    <Flex gap='4' alignItems={'center'}>
                        <Link to="/">Home </Link>
                        <Link to="/movies">Movies </Link>
                        <Link to="/shows">TV Shows </Link>
                        <Link to="/search">{<SearchIcon fontSize={'xl'}/>} </Link>
                        {user &&(
                            <Menu>
                                <MenuButton>
                                    <Avatar bg={"red.500"} color={"white"} size={"sm"} name={(user.displayName)}/>
                                </MenuButton>
                                <MenuList>
                                    <Link to="/">
                                        <MenuItem> WatchList</MenuItem>
                                    </Link>
                                    <MenuItem onClick={logOut}> Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        )}

                        {!user && (
                            <Link to="/login" bg={"blue.500"} color={"red"} size={"sm"}> {<Avatar/>}</Link>
                        )}

                    </Flex>

                </Flex>

            </Container>

        </Box>
    )
}

export default Navbar