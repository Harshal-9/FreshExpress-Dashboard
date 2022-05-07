import React from "react";
import Select from "react-select";

//initializing fertilizerdata

const fertilizerData = [
    { value: 0, label: "None" },
    { value: 1, label: "Calcium" },
    { value: 2, label: "Policarb Ca" },
    { value: 3, label: "Calcium + Magnesium" },
    { value: 4, label: "Zinc" },
    { value: 5, label: "Basfoliar Ca-Mg" },
    { value: 6, label: "Polycarb" },
    { value: 7, label: "Zincbact" },
    { value: 8, label: "Tamro" },
    { value: 9, label: "Libral" },
    { value: 10, label: "Taba-G" },
    { value: 11, label: "Magnesium" },
    { value: 12, label: "Rexcoline" },
    { value: 13, label: "Ferrous" },
    { value: 14, label: "Policarb" },
    { value: 15, label: "Metaclo" },
    { value: 16, label: "Fertica (Ferrous)" },
    { value: 17, label: "Sodium Molybdenum" }
];

//initializing fungicideData

const fungicideData = [
    { value: 0, label: "None" },
    { value: 1, label: "Sulphur" },
    { value: 2, label: "Mancozeb" },
    { value: 3, label: "Dinocap" },
    { value: 4, label: "Mandipropamid" },
    { value: 5, label: "Copper Oxychloride" },
    { value: 6, label: "Dimethomorph" },
    { value: 7, label: "Mancozeb + Cymoxanil" },
    { value: 8, label: "Propineb" },
    { value: 9, label: "Mancozeb + Carbendazim" },
    { value: 10, label: "Iprovalicarb + propineb" },
    { value: 11, label: "Chlorothalonil" },
    { value: 12, label: "Pyraclostrobin + Fluxapyroxad" },
    { value: 13, label: "Boscalid 25.2%+pyraclostrobin 12,8%wg" },
    { value: 14, label: "Tebuconazole + Fluopyram" },
    { value: 15, label: "Fosetyl-al" },
    { value: 16, label: "Difenoconazole" },
    { value: 17, label: "Fosetyl-al + Fluopicolide" },
    { value: 18, label: "Cosavet" },
    { value: 19, label: "M-45" },
    { value: 20, label: "Karathene" },
    { value: 21, label: "Revus" },
    { value: 22, label: "Blitox" },
    { value: 23, label: "Acrobat" },
    { value: 24, label: "Curzate" },
    { value: 25, label: "Antracol" },
    { value: 26, label: "Saaf" },
    { value: 27, label: "Melody Duo" },
    { value: 28, label: "Kavach" },
    { value: 29, label: "Merivon" },
    { value: 30, label: "Pulito" },
    { value: 31, label: "Luna Experience" },
    { value: 32, label: "Alliete" },
    { value: 33, label: "Score" },
    { value: 34, label: "Profiler" },
    { value: 35, label: "Sultaf" },
    { value: 36, label: "Blue copper" },
    { value: 37, label: "Moximate" },
    { value: 38, label: "Thiogreen" },
    { value: 39, label: "Nutrifight" },
    { value: 40, label: "Thionutri" },
    { value: 41, label: "Sanchar" },
    { value: 42, label: "Topgun" },
    { value: 43, label: "Sanipeb" },
    { value: 44, label: "Ilpis" },
    { value: 45, label: "Tata Eshan" }
];


//initializing insectcideData

const insectcideData = [
    { value: 0, label: "None" },
    { value: 1, label: "Buprofezin" },
    { value: 2, label: "Imidacloprid" },
    { value: 3, label: "Thiamethoxam" },
    { value: 4, label: "Abamectin" },
    { value: 5, label: "Emamectin benzoate" },
    { value: 6, label: "Applaud" },
    { value: 7, label: "Confidor" },
    { value: 8, label: "Actara" },
    { value: 9, label: "Abacin" },
    { value: 10, label: "Proclaim" },
    { value: 11, label: "Flotis" },
    { value: 12, label: "Tatamida" },
    { value: 13, label: "Spolite" },
    { value: 14, label: "Sygenta-Agrimake" },
    { value: 15, label: "Imoz" },
    { value: 16, label: "Lapa" },
    { value: 17, label: "Atom" },
    { value: 18, label: "Hotshot" },
    { value: 19, label: "Tata Rilon" }
];
//initializing organicData


const organicData = [
    { value: 0, label: "None" },
    { value: 1, label: "Seaweed" },
    { value: 2, label: "Bacillus subtilis" },
    { value: 3, label: "Trichoderma viride" },
    { value: 4, label: "VBM - Verticillium + Beauveria + Metarhizium" },
    { value: 5, label: "Metarhizium" },
    { value: 6, label: "Beauveria bassiana" },
    { value: 7, label: "Pseudomonas fluorescens" },
    { value: 8, label: "(VAM) Vesicular Arbuscular Mycorrhizae" },
    { value: 9, label: "(KMB) Potassium Mobilizing Biofertilizer" },
    { value: 10, label: "(PSB) Phosphorus solubilizing bacteria" },
    { value: 11, label: "Azatobacter" },
    { value: 12, label: "EM2" },
    { value: 13, label: "Dashparni" },
    { value: 14, label: "Amil Ark" },
    { value: 15, label: "Vemil Ark" },
    { value: 16, label: "Fish Kelp" },
    { value: 17, label: "Fal Kelp" },
    { value: 18, label: "Ampelomyces Quisqualis" },
    { value: 19, label: "Anupaan Grapes" },
    { value: 20, label: "Humic Acid" },
    { value: 21, label: "Fulvic Acid" },
    { value: 22, label: "DF1" },
    { value: 23, label: "DF2" },
    { value: 24, label: "Jivanu Slury" },
    { value: 25, label: "Pharmamin" },
    { value: 26, label: "FE Kelp" },
    { value: 27, label: "Jesta" },
    { value: 28, label: "Adra" },
    { value: 29, label: "VB Guard" },
    { value: 30, label: "Varunasra" },
    { value: 31, label: "Hasta" },
    { value: 32, label: "Jai" },
    { value: 33, label: "Mycozoots-G" },
    { value: 34, label: "Potak" },
    { value: 35, label: "Phosfert" },
    { value: 36, label: "Azo-N" },
    { value: 37, label: "Stimplex" },
    { value: 38, label: "Milastin Kanbio" },
    { value: 39, label: "Tricho Shield" },
    { value: 40, label: "Milgo" },
    { value: 41, label: "Kalichakra" },
    { value: 42, label: "Brigade-B" },
    { value: 43, label: "Biokuyar-B" },
    { value: 44, label: "Ecomax" },
    { value: 45, label: "UptecK" },
    { value: 46, label: "Microphos PSB" },
    { value: 47, label: "NTS Kelp" },
    { value: 48, label: "Sutlex-Microbax" },
    { value: 49, label: "Nemastin" },
    { value: 50, label: "Kamab 26" },
    { value: 51, label: "Daman" },
    { value: 52, label: "Kalichakra+Daman" },
    { value: 53, label: "Can-Psuedo" },
    { value: 54, label: "Sinchekelp" },
    { value: 55, label: "KVK VBM" },
    { value: 56, label: "Sudo" },
    { value: 57, label: "Trikelp" },
    { value: 58, label: "Biosting" },
    { value: 59, label: "IPL" },
    { value: 60, label: "Kelp-3" },
    { value: 61, label: "Biovita" },
    { value: 62, label: "Agrogen" }
];

//initializing plantGrowthRegulatorData


const plantGrowthRegulatorData = [
    { value: 0, label: "None" },
    { value: 1, label: "Ambition" },
    { value: 2, label: "Ethefol" },
    { value: 3, label: "Dormex" },
    { value: 4, label: "Fertistar" },
    { value: 5, label: "Highsil" },
    { value: 6, label: "Proggib" },
    { value: 7, label: "Ethephon" },
    { value: 8, label: "Hydrogen Cyanamide" },
    { value: 9, label: "Amino Acid" },
    { value: 10, label: "Silicon 0.8%" },
    { value: 11, label: "Gibberellic acid" },
    { value: 12, label: "Ethrel" },
    { value: 13, label: "Saibreak" },
    { value: 14, label: "Isabion" },
    { value: 15, label: "Silicare" },
    { value: 16, label: "GA" },
    { value: 17, label: "Tagpon" },
    { value: 18, label: "Polyminogold" },
    { value: 19, label: "Tatabahar" },
    { value: 20, label: "Silisio" },
    { value: 21, label: "FE Kelp" }
];


//function to sent dropdown data according to selected option
function ChemicalDropDown(props) {
    const selectedType = props.selectedType;
    const func = props.getSprayingData;
    const rowNo = props.rowNo;
    const columnNo = props.columnNo;


    function getArray() {
        switch (selectedType) {
            case "Fertilizer":
                return fertilizerData;

            case "Fungicide":
                return fungicideData;

            case "Insecticide":
                return insectcideData;

            case "Organic":
                return organicData;

            default:
                return plantGrowthRegulatorData;
        }
    }

    const handleChange = (e) => {
        func({ Chemical: e.label, RowNo: rowNo, ColumnNo: columnNo });
    };

    return (
        <Select
            defaultValue={fertilizerData[0]}
            options={getArray()}
            onChange={handleChange}
        />
    );
}

export default ChemicalDropDown;
