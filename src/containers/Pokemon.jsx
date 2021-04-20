import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetPokemon} from "../actions/pokemonActions";
import {
    Badge,
    Flex,
    List,
    ListItem,
    Spinner,
    Stat,
    Tag,
    TagLabel,
    TagRightIcon,
    Text
} from "@chakra-ui/react";
import {SpinnerIcon, WarningIcon, QuestionIcon} from "@chakra-ui/icons"
import {Message} from "../components/Message";
import _ from "lodash";

const Pokemon = (props) => {
    const pokemonName = props.match.params.pokemon;
    const dispatch = useDispatch();
    const {data, loading, errorMsg} = useSelector(state => state.Pokemon);
    useEffect(() => {
        dispatch(GetPokemon(pokemonName))
    }, []);

    const ShowData = () => {
        if (!_.isEmpty(data[pokemonName])) {
            const {abilities, sprites, stats} = data[pokemonName];
            console.log(sprites)
            return (
                <div className={"pokemon-wrapper"}>
                    <div className={"item"}>
                        <Tag size="md" variant="solid" colorScheme="purple">
                            <TagLabel>Sprites</TagLabel>
                            <TagRightIcon as={SpinnerIcon}/>
                        </Tag>
                        <div className="sprites">
                            <img src={sprites.front_default} alt=""/>
                            <img src={sprites.back_default} alt=""/>
                            <img src={sprites.front_shiny} alt=""/>
                            <img src={sprites.back_shiny} alt=""/>
                        </div>
                    </div>
                    <div className="item">
                        <Stat>
                            <Tag size="md" variant="solid" colorScheme="orange">
                                <TagLabel>Stats</TagLabel>
                                <TagRightIcon as={WarningIcon}/>
                            </Tag>
                            <List>
                                {stats.map(({stat: {name}, base_stat}) => {
                                    return <ListItem key={name.toString()}>
                                        <Badge variant="solid" colorScheme="teal">{name}</Badge>
                                        <Tag size="md" variant="outline" colorScheme="cyan">{base_stat}</Tag>
                                    </ListItem>
                                })}
                            </List>
                        </Stat>
                    </div>
                    <div className="item">
                        <Stat>
                            <Tag size="md" variant="solid" colorScheme="messenger">
                                <TagLabel>Abilities</TagLabel>
                                <TagRightIcon as={QuestionIcon}/>
                            </Tag>
                            <List>
                                {abilities.map(({ability: {name}}) => {
                                    return <ListItem key={name.toString()}><Badge variant="solid" colorScheme="purple">{name}</Badge></ListItem>
                                })}
                            </List>
                        </Stat>
                    </div>
                </div>
            )
        }

        if (loading) {
            return <Spinner size="lg"/>
        }

        if (errorMsg !== "") {
            return <Message message={errorMsg}/>
        }

        return <Message message="Error getting pokemon"/>
    }

    return (
        <div className={"poke"}>
            <Flex m={3}>
                <Text mr={2}>Results: </Text>
                <Tag size="md" variant="outline" colorScheme="blue">
                    <TagLabel>{pokemonName}</TagLabel>
                </Tag>
            </Flex>
            {ShowData()}
        </div>
    )
};

export default Pokemon
