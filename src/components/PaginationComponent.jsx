import {Flex, Text} from "@chakra-ui/react";
import {Button} from "@chakra-ui/icons";
import PropTypes from "prop-types";
import propTypes from "prop-types";


const PaginationComponent = ({activePage, totalPages,setActivePage}) => {
    return (
      <Flex gap={2} alignItems={"center"} justifyContent={"center"}>

          <Flex gap={2} alignItems={"center"} maxW={"250px"} my={10}>
              <Button isDisabled={activePage ===1}  onClick={()=> setActivePage (activePage-1)}> Prev</Button>
              <Button isDisabled={activePage === totalPages} onClick={()=> setActivePage (activePage+1)}> Next</Button>
          </Flex>

          <Flex gap={1}>
              <Text> {activePage} </Text>
              <Text> of </Text>
              <Text> {totalPages}</Text>
          </Flex>


      </Flex>
    );
};

PaginationComponent.propTypes = {
    activePage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    setActivePage: propTypes.func
}

export default PaginationComponent;