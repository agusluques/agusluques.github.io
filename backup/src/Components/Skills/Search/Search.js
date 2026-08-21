import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { skills } from '../my-skills';
import styles from './Search.module.scss';

const Search = () => {
    const [value, setValue] = useState(0);
    const [info, setInfo] = useState('');

    useEffect(() => {
        const selected = skills.find((skill) => skill.value === value);
        setInfo(selected.info);
    }, [value])

    return (
        <React.Fragment>
            <Select
                menuPlacement="top"
                options={skills.slice(0, -1)}
                placeholder="More info..."
                className={styles.search}
                onChange={(e) => setValue(e ? e.value : 0)}
            />
            <span className={styles.info}>{info}</span>
        </React.Fragment>
    )
}

export default Search;