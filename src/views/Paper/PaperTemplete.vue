<template>
    <div class="container">
        <div class="row gutters">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="card">
                    <div class="card-body p-0">
                        <div class="invoice-container">
                            <div class="invoice-header">
                                <!-- Row start -->
                                <div class="row gutters">
                                    <div
                                        class="col-xl-9 col-lg-9 col-md-9 col-sm-9 mb-4"
                                    >
                                        <a
                                            href="https://www.facebook.com/Xidealdesign"
                                            class="invoice-logo"
                                        >
                                            {{ paper && paper.user_shop.name }}
                                        </a>
                                        <address>
                                            {{
                                                paper && paper.user_shop.address
                                            }}
                                        </address>
                                    </div>
                                </div>
                                <!-- Row end -->
                                <!-- Row start -->
                                <div class="row gutters">
                                    <div
                                        class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8"
                                    >
                                        <div class="invoice-details">
                                            <address>
                                                {{
                                                    paper && paper.customer.name
                                                }}
                                                {{
                                                    paper &&
                                                    paper.customer.name &&
                                                    paper.customer.phone
                                                        ? "-"
                                                        : ""
                                                }}
                                                {{
                                                    paper &&
                                                    paper.customer.phone
                                                }}<br />
                                                {{
                                                    paper &&
                                                    paper.customer.address
                                                }}
                                            </address>
                                        </div>
                                    </div>
                                    <div
                                        class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4"
                                    >
                                        <div class="invoice-details">
                                            <div class="invoice-num">
                                                <v-row :no-gutters="true">
                                                    <v-col
                                                        cols="5"
                                                        style="text-align: left"
                                                        >Type:
                                                    </v-col>
                                                    <v-col cols="7">{{
                                                        paper &&
                                                        paper.paper_type.toUpperCase()
                                                    }}</v-col>
                                                    <v-col
                                                        cols="5"
                                                        style="text-align: left"
                                                        >Id:
                                                    </v-col>
                                                    <v-col cols="7"
                                                        >#{{
                                                            paper && paper.id
                                                        }}</v-col
                                                    >
                                                    <v-col
                                                        cols="5"
                                                        style="text-align: left"
                                                        >Date:
                                                    </v-col>
                                                    <v-col cols="7">{{
                                                        paper &&
                                                        paper.updated_at
                                                    }}</v-col>
                                                    <v-col
                                                        cols="5"
                                                        style="text-align: left"
                                                        >Price Unit:
                                                    </v-col>
                                                    <v-col cols="7">{{
                                                        paper &&
                                                        paper.price_unit.toUpperCase()
                                                    }}</v-col>
                                                </v-row>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Row end -->
                            </div>
                            <div class="invoice-body">
                                <!-- Row start -->
                                <div class="row gutters">
                                    <div class="col-lg-12 col-md-12 col-sm-12">
                                        <div class="table-responsive">
                                            <table
                                                class="table custom-table m-0"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th style="width: 60%">
                                                            ITEM DESCRIPTION
                                                        </th>
                                                        <th>QUANTITY</th>
                                                        <th>UNIT PRICE</th>
                                                        <th>AMOUNT</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr
                                                        v-for="(
                                                            item, index
                                                        ) in paper &&
                                                        paper.items
                                                            ? paper.items
                                                            : []"
                                                        :key="index"
                                                    >
                                                        <td>
                                                            {{
                                                                item.description || "&nbsp;"
                                                            }}
                                                            <!-- <p
                                                                class="m-0 text-muted"
                                                            >
                                                                Reference site
                                                                about Lorem
                                                                Ipsum, giving
                                                                information on
                                                                its origins.
                                                            </p> -->
                                                        </td>
                                                        <td>{{ item.unit }}</td>
                                                        <td>
                                                            {{
                                                                item.unit_price
                                                            }}
                                                        </td>
                                                        <td>
                                                            {{
                                                                item.unit !=
                                                                    "" &&
                                                                item.unit_price !=
                                                                    ""
                                                                    ? (
                                                                          item.unit *
                                                                          item.unit_price
                                                                      ).toFixed(
                                                                          2
                                                                      )
                                                                    : null
                                                            }}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tbody>
                                                    <tr>
                                                        <td
                                                            style="
                                                                white-space: pre-line;
                                                            "
                                                        >
                                                            <p>
                                                                {{
                                                                    paper &&
                                                                    paper.comment
                                                                }}
                                                            </p>
                                                        </td>
                                                        <td colspan="2">
                                                            <p>
                                                                Subtotal<br />
                                                                Discount<br />
                                                                Deposit<br />
                                                            </p>
                                                            <h5
                                                                class="text-success"
                                                            >
                                                                <strong
                                                                    >Grand
                                                                    Total</strong
                                                                >
                                                            </h5>
                                                        </td>
                                                        <td>
                                                            <p>
                                                                {{
                                                                    subTotal.toFixed(
                                                                        2
                                                                    )
                                                                }}<br />
                                                                {{
                                                                    paper &&
                                                                    paper.discount
                                                                }}<br />
                                                                {{
                                                                    paper &&
                                                                    paper.deposit
                                                                }}<br />
                                                            </p>
                                                            <h5
                                                                class="text-success"
                                                            >
                                                                <strong>{{
                                                                    grandTotal.toFixed(
                                                                        2
                                                                    )
                                                                }}</strong>
                                                            </h5>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- Row end -->
                            </div>
                            <div class="invoice-footer">
                                Thank you for your Business.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { paperStore } from "../../stores/paperStore";
import moment from "moment";
import { PAPER_TYPE } from "../../constant/constant";

export default {
    data: () => ({ paper: null }),
    beforeMount() {
        paperStore()
            .getPaper(this.$router.currentRoute.value.params.id)
            .then((response) => {
                console.log(response);
                if (response.status === "ok" && response.data != null) {
                    this.paper = response.data;
                    this.paper.updated_at = new moment(
                        this.paper.updated_at
                    ).format("YYYY/MM/DD");
                    console.log(
                        moment(new Date()).format(
                            "ddd MMM DD, YYYY [at] HH:mm a"
                        )
                    );
                }
            });
    },
    computed: {
        subTotal() {
            if (this.paper) {
                this.paper.items.forEach((val) => {
                    val.price = (
                        parseFloat(val.unit_price) * parseFloat(val.unit)
                    ).toFixed(2);
                    if (val.price == "NaN") val.price = null;
                });
                const total = this.paper.items.reduce(
                    (sum, item) =>
                        (sum +=
                            item.price != null ? parseFloat(item.price) : 0),
                    0
                );
                return total;
            }
            return 0;
        },

        grandTotal() {
            if (this.paper) {
                var grandTotal = 0;
                const subtotal = this.subTotal;
                if (this.paper.paper_type == PAPER_TYPE.QUOTATION) {
                    grandTotal = subtotal - this.paper.discount;
                } else {
                    grandTotal =
                        subtotal - this.paper.discount - this.paper.deposit;
                }
                return grandTotal;
            }
            return 0;
        },
    },
};
</script>

<style scoped>
body {
    margin-top: 20px;
    color: #2e323c;
    background: #f5f6fa;
    position: relative;
    height: 100%;
}
.invoice-container {
    padding: 1rem;
}
.invoice-container .invoice-header .invoice-logo {
    margin: 0.8rem 0 0 0;
    display: inline-block;
    font-size: 1.6rem;
    font-weight: 700;
    color: #2e323c;
}
.invoice-container .invoice-header .invoice-logo img {
    max-width: 130px;
}
.invoice-container .invoice-header address {
    font-size: 0.8rem;
    color: #2e323c;
    margin: 0;
    white-space: pre-line;
}
.invoice-container .invoice-details {
    padding: 1rem;
    line-height: 180%;
    background: #f5f6fa;
    height: 100%;
}
.invoice-container .invoice-details .invoice-num {
    text-align: right;
    font-size: 0.8rem;
}
.invoice-container .invoice-body {
    width: 100%;
    padding: 1rem 0 0 0;
}
.invoice-container .invoice-footer {
    text-align: center;
    font-size: 0.7rem;
    margin: 5px 0 0 0;
}

.invoice-status {
    text-align: center;
    padding: 1rem;
    background: #ffffff;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    margin-bottom: 1rem;
}
.invoice-status h2.status {
    margin: 0 0 0.8rem 0;
}
.invoice-status h5.status-title {
    margin: 0 0 0.8rem 0;
    color: #9fa8b9;
}
.invoice-status p.status-type {
    margin: 0.5rem 0 0 0;
    padding: 0;
    line-height: 150%;
}
.invoice-status i {
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
    display: inline-block;
    padding: 1rem;
    background: #f5f6fa;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 50px;
}
.invoice-status .badge {
    text-transform: uppercase;
}

@media (max-width: 767px) {
    .invoice-container {
        padding: 1rem;
    }
}

.custom-table > :not(:first-child) {
    border-top: 0px;
}

.custom-table > tbody td:last-child {
    text-align: right;
}

.custom-table {
    width: 100%;
    border: 1px solid #e0e3ec;
}
.custom-table thead {
    background: #007ae1;
}
.custom-table thead th {
    border: 0;
    color: #ffffff;
}
.custom-table > tbody tr:hover {
    background: #fafafa;
}
.custom-table > tbody td {
    border: 1px solid #e6e9f0;
}

.card {
    background: #ffffff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: 0;
    margin-bottom: 1rem;
}

.text-success {
    color: #00bb42 !important;
}

.text-muted {
    color: #9fa8b9 !important;
}

.custom-actions-btns {
    margin: auto;
    display: flex;
    justify-content: flex-end;
}

.custom-actions-btns .btn {
    margin: 0.3rem 0 0.3rem 0.3rem;
}
</style>
