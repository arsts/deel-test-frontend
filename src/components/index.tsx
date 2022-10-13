import React, {useEffect, useState} from 'react';
import { useDebounce } from '../hooks/useDebounce';
import styles from './index.module.css';


interface Props {
    placeholder?: string;
    getData: (searchTerm: string) => Promise<string[]>
}

const Autocomplete: React.FC<Props> = ({placeholder, getData}) => {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [data, setData] = useState<string[]>([]);
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (searchTerm: string) => {
        const result = await getData(searchTerm).finally(() => setIsLoading(false))
        setData(result);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        setIsVisible(true)
    }

    useEffect(() => {
        if(debouncedSearchTerm) {
            setIsLoading(true);
            fetchData(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm])


    const getHighlightedText = (text: string, highlight: string) => {
        // Split on highlight term and include term into parts, ignore case
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span> {parts.map((part, i) =>
                <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? {fontWeight: 'bold'} : {}}>
            {part}
            </span>)
            } </span>
        );
    }

    const onArrowUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (selectedIndex === 0) {
            setSelectedIndex(0);
        } else {
            setSelectedIndex(selectedIndex - 1);
        }
    }

    const onArrowDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (selectedIndex === data.length - 1) {
            setSelectedIndex(0);
        } else {
            setSelectedIndex(selectedIndex + 1);
        }
    }

    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isVisible) {
            setSearchTerm(data[selectedIndex]);
            setIsVisible(false);
            setSelectedIndex(0);
            setData([]);
        }
    }

    const onEscape = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setSelectedIndex(0);
        setIsVisible(false);
    }

    const onClick = (e: React.MouseEvent) => {
        setSearchTerm(data[selectedIndex])
        setIsVisible(false);
        setSelectedIndex(0);
    };

    const onBlur = () => {
        setIsVisible(false);
    };

    const onFocus = () => {
        setIsVisible(true);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            onArrowDown(e)
        }
        if (e.key === "ArrowUp") {
            onArrowUp(e)
        }
        if (e.key === "Enter") {
            onEnter(e)
        }
        if (e.key === "Escape") {
            onEscape(e)
        }
    }

    const onMouseDown = (e: React.MouseEvent) => {
        // Prevent default behaviour for onClick to work
        e.preventDefault()
    }


    const showSuggestions = () => {
        if (data.length) {
            return (
                <ul className={styles.list} onClick={() => console.log('ul')}>
                    {
                        data.map((item, index) => {
                            return (
                                <li key={`${item}-${index}`}
                                    className={index === selectedIndex ? styles.active : undefined}
                                    onMouseDown={onMouseDown}
                                    onClick={onClick}>{getHighlightedText(item, searchTerm)}</li>
                            )
                        })
                    }
                </ul>
            )
        } else {
            return (<p>No result</p>)
        }
    }

    useEffect(() => {
        if (!searchTerm) {
            setIsVisible(false)
        }
    }, [isVisible, searchTerm])

    return (
        <div className={styles.container}>
            <input type='text'
                   placeholder={placeholder}
                   onChange={handleChange}
                   className={styles.autoComplete}
                   onKeyDown={onKeyDown}
                   onBlur={onBlur}
                   onFocus={onFocus}
                   value={searchTerm}/>
            {data && isVisible && !isLoading && showSuggestions()}
            {isLoading && <p>Loading...</p>}
        </div>
    );

};

export default Autocomplete;