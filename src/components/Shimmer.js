import React from "react";
const Shimmer=()=>{
    return(
            <div className="shimmer-container">
                {
                Array(10).fill("").map((_,index)=>(
                <div key={index} className="shimmer-card">
                    <div className="shimmer-image">

                    </div>
                    <div className="shimmer-content">
                        <div className="shimmer-line"></div>
                        <div class="shimmer-line short"></div>
                    </div>
                </div>
                ))}
            </div>
    );
}
export default Shimmer;