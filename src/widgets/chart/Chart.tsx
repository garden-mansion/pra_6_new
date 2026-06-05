import { Navbar } from "../components/Navbar";
import GroupGrid from "./components/GroupGrid";
import GroupChart from "./components/GroupChart";
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { years, countries, types } from "./groupdata";
import { useState } from 'react';
import { NAV_ITEMS } from '../navItems';

type TSelect = "Страна" | "Год" | "Тип";

function Chart() {
    const [group, setGroup] = useState<TSelect>("Страна");
    const [groupData, setGroupData] = useState(countries);

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value as TSelect;
        setGroup(value);
        if (value === "Страна") setGroupData(countries);
        else if (value === "Год") setGroupData(years);
        else if (value === "Тип") setGroupData(types);
    };

    return (
        <div>
            <Navbar active={2} navItems={NAV_ITEMS} />
            <Box sx={{ width: "200px", m: "auto", mt: "20px" }}>
                <FormControl fullWidth>
                    <InputLabel>Группировать по</InputLabel>
                    <Select
                        id="select-group"
                        value={group}
                        label="Группировать по"
                        onChange={handleChange}
                    >
                        <MenuItem value="Страна">Стране</MenuItem>
                        <MenuItem value="Год">Году</MenuItem>
                        <MenuItem value="Тип">Типу</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <GroupChart data={groupData} />
            <GroupGrid data={groupData} />
        </div>
    );
}

export default Chart;
