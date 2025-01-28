import {Box, Container, FormLabel, Heading, Input, FormControl, useToast, VStack, Text, Icon} from "@chakra-ui/react";
import { useState } from "react";
import {Form, Link, useNavigate} from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import {Button} from "@chakra-ui/icons";
import {useAuth} from "../../context/useAuth.js";
import { FcGoogle } from "react-icons/fc";



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const toast = useToast();
    const {loginWithEmailAndPassword,signInWithGoogle} = useAuth();
    const navigate = useNavigate()

    const  loginHandler = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast({
                title: "Error",
                description: "Please fill in both fields.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        try{
            await loginWithEmailAndPassword(email, password)
            navigate("/")
            toast({
                title: "Success",
                description: "Email login successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
        catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: `${error.message}`,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    };

    const googleLoginHandler = async () => {

        try{
            await signInWithGoogle(email, password);
            navigate("/");
            toast({
                title: "Success",
                description: "Login with Google successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
        catch (error) {
            console.log("error",error);
            toast({
                title: "Error",
                description: `${error.message}`,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
        <Container>
            <Box maxW={"sm"} mx="auto" p={6}>
                <Form onSubmit={loginHandler}>
                    <VStack spacing={4}>
                        <Heading>Login</Heading>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </FormControl>
                        <Button type={"submit"}> Login </Button>
                    </VStack>
                </Form>
                <Box align={"center"}>
               <Heading as={"h2"} size={"xs"}  m={3} color={"grey"}> Or </Heading>
                    <Text fontSize={17} color={"grey"} m={3}> Sign in with </Text>
                     <Icon fontSize={35} as={FcGoogle} _hover={{cursor:"pointer",shadow:"1px 1px 2px black, 0 0 25px black, 0 0 10px gray"}}  onClick={googleLoginHandler} />
                    <Text> Does not have an account yet?</Text>
                    <ChakraLink
                        as={Link}
                        to={"/register"}
                        color={"blue.300"}
                        textDecoration={"underline"}
                        _hover={{ color: "green.500"}}
                    >
                        Register Here
                    </ChakraLink>
                </Box>
            </Box>

        </Container>
    );
};

export default Login;
