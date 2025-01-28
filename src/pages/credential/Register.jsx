import {useState} from "react";
import {Box, Container, FormControl, FormLabel, Heading, Input, useToast, VStack} from "@chakra-ui/react";
import {useAuth} from "../../context/useAuth.js";
import {Form, useNavigate} from "react-router-dom";
import {Button} from "@chakra-ui/icons";

const Register = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const toast = useToast();
    const {registerWithEmailAndPassword} = useAuth();
    const navigate = useNavigate()

    const  registerHandler = async (e) => {
        e.preventDefault();
        try{
        if (!email || !password || !confirmPassword) {
            toast({
                title: "Error",
                description: "Please fill in all fields.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        else if ( password !== confirmPassword ) {
            toast({
                title: "Error",
                description: 'passwords do not match',
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        await registerWithEmailAndPassword(email, password,userName);
        navigate("/");
        toast({
            title: "Success",
            description: "Account Register successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
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
    return (
        <div>
            <Container>
                <Box maxW={"sm"} mx="auto" p={6}>
                    <Form onSubmit={registerHandler}>
                        <VStack spacing={4}>
                            <Heading> Register </Heading>
                            <FormControl>
                                <FormLabel>User Name</FormLabel>
                                <Input
                                    type="username"
                                    value={userName}
                                    onChange={(e)=> setUserName(e.target.value)}
                                    placeholder="User Name"
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e)=> setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e)=> setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Confirm Password</FormLabel>
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e)=> setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                />
                            </FormControl>
                            <Button type="submit"> Register </Button>
                        </VStack>
                    </Form>

                </Box>
            </Container>

        </div>
    );
};

export default Register;