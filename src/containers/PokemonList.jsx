import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {GetPokemonList} from "../actions/pokemonActions";
import {Link} from "react-router-dom";
import {Button, Input, Spinner} from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import {Message} from "../components/Message";

const PokemonList = (props) => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const {data, loading, errorMsg, count} = useSelector(state => state.PokemonList);
    useEffect(() => {
        FetchData(1)
    }, []);

    const FetchData = (page = 1) => {
        dispatch(GetPokemonList(page))
    }

    const ShowData = () => {
        if (loading) {
            return <Spinner size="lg"/>
        }

        if (!_.isEmpty(data)) {
            return (
                <div className={"list-wrapper"}>
                    {data.map(({name, key = name.toString()}) => {
                        return (
                            <div className={"pokemon-item"} key={key}>
                                <p>{name}</p>
                                <Link to={`/pokemon/${name}`}>View</Link>
                            </div>
                        )
                    })}
                </div>
            )
        }

        if (errorMsg !== "") {
            return <Message message={errorMsg}/>
        }

        return <Message message="Error getting pokemon"/>
    };

    return (
        <div>
            <div className={"search-wrapper"}>
                <Input placeholder="Type pokemon name..." size="md" onChange={e => setSearch(e.target.value)}/>
                <Button
                    colorScheme="teal"
                    size="md"
                    onClick={() => props.history.push(`/pokemon/${search}`)}
                >
                    Search
                </Button>
            </div>
            {ShowData()}
            {!_.isEmpty(data) && (
                <ReactPaginate
                    pageCount={Math.ceil(count / 15)}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    onPageChange={(data) => FetchData(data.selected + 1)}
                    containerClassName={"pagination"}
                />
            )}
        </div>
    )
};

export default PokemonList
