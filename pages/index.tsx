import React from "react";
import {ContentHead} from "../components/contentHead";
import Carousel from "../components/carousel/Carousel";
import {Box} from "@chakra-ui/react";

const Index = () => {
    return (
        <>
            <ContentHead pageName="Akce"/>

            <Carousel autoPlay maxWidth="xl" mx="auto">
                <Box w="150px" h="150px" bg="red" />
                <Box w="150px" h="150px" bg="blue" />
                <Box w="150px" h="150px" bg="red" />
                <Box w="150px" h="150px" bg="blue" />
                <Box w="150px" h="150px" bg="red" />
                <Box w="150px" h="150px" bg="blue" />
                <Box w="150px" h="150px" bg="red" />
                <Box w="150px" h="150px" bg="blue" />
                <Box w="150px" h="150px" bg="red" />
                <Box w="150px" h="150px" bg="blue" />
            </Carousel>
        </>
    );
};

export default Index;
