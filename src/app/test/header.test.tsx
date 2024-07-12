import React from "react"
import "@testing-library/jest-dom"
import Header from "../components/header"
import { render } from "@testing-library/react"
describe("test header",()=>{
    it("きちんと表示されているか",()=>{
        const {getByText} = render(<Header />);
        expect(getByText("都道府県人口推移図")).toBeInTheDocument();
    }); 
});