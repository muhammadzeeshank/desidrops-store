"use client";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { PhoneInput } from "./PhoneInput";
import { isValidPhoneNumber } from "react-phone-number-input";
const formSchema = z.object({
  "text-0": z.string(),
  email: z.string().email("Invalid email address"),
  "text-1": z.string(),
  country: z.string(),
  firstname: z.string().min(1, "Required"),
  lastname: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  postalcode: z.string(),
  phone: z
    .string()
    .min(1, "Required")
    .refine((val) => isValidPhoneNumber(val || ""), {
      message: "Invalid phone number",
    }),
  "text-3": z.string(),
  "text-4": z.string(),
});

export type CheckoutFormRef = {
  submit: () => void;
};

export type CheckoutFormType = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (data: CheckoutFormType) => void;
  onValidityChange?: (isValid: boolean) => void;
};

const CheckoutForm = forwardRef<CheckoutFormRef, Props>(
  ({ onSubmit, onValidityChange }, ref) => {
    const formRef = useRef<HTMLFormElement>(null);

    const form = useForm<CheckoutFormType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        "text-0": "",
        email: "",
        "text-1": "",
        country: "pakistan",
        firstname: "",
        lastname: "",
        address: "",
        city: "",
        postalcode: "",
        phone: "",
        "text-3": "",
        "text-4": "",
      },
      mode: "onChange",
    });

    function onReset() {
      form.reset();
      form.clearErrors();
    }

    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
      const subscription = form.watch(() => {
        onValidityChange?.(form.formState.isValid);
      });
      return () => subscription.unsubscribe();
    }, [form, onValidityChange]);

    // Expose submit function to parent
    useImperativeHandle(ref, () => ({
      submit: () => form.handleSubmit(onSubmit)(),
    }));
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onReset={onReset}
          className="space-y-8 @container"
        >
          <div className="grid grid-cols-12 gap-4">
            <div
              className=" col-span-12 @3xl:col-span-12 col-start-auto"
            >
              <p className="not-first:mt-6 text-xl font-medium">Contact Information</p>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel className="flex shrink-0">Email</FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          key="email"
                          placeholder=""
                          type="email"
                          id="email"
                          className=" "
                          {...field}
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div
              key="text-1"
              id="text-1"
              className=" col-span-12 @3xl:col-span-12 col-start-auto"
            >
              <p className="not-first:mt-6 text-xl font-medium">Shipping Information</p>
            </div>

            <FormField
              control={form.control}
              name="country"
              disabled
              render={({ field }) => (
                <FormItem className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel className="flex shrink-0">Country</FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <Select
                        key="country"
                        {...field}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full ">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem key="pakistan" value="pakistan">
                            Pakistan
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="col-span-12 @2xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel className="flex shrink-0">First Name</FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          key="firstname"
                          placeholder=""
                          type="text"
                          id="firstname"
                          className=" "
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <div className="min-h-[20px] w-full">
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="col-span-12 @2xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel className="flex shrink-0">Last Name</FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          key="lastname"
                          placeholder=""
                          type="text"
                          id="lastname"
                          className=" "
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <div className="min-h-[20px] w-full">
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel className="flex shrink-0">Address</FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <Textarea
                        key="address"
                        id="address"
                        placeholder=""
                        className=""
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel className="flex shrink-0">City</FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          key="city"
                          placeholder=""
                          type="text"
                          id="city"
                          className=" "
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <div className="min-h-[20px] w-full">
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalcode"
              render={({ field }) => (
                <FormItem className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel className="flex shrink-0">Postal Code</FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          key="postalcode"
                          placeholder=""
                          type="text"
                          id="postalcode"
                          className=" "
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <div className="min-h-[20px] w-full">
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel className="flex shrink-0">Phone</FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <div className="relative w-full">
                        {/* <Input
                        key="phone"
                        placeholder=""
                        type="tel"
                        id="phone"
                        className=" "
                        {...field}
                      /> */}
                        <PhoneInput
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          defaultCountry="PK"
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div
              key="text-3"
              id="text-3"
              className=" col-span-12 @3xl:col-span-12 col-start-auto"
            >
              <p className="not-first:mt-6 text-xl font-medium">Payment Method</p>
            </div>

            {/* <FormField
            control={form.control}
            name="payment-method"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-12 col-start-auto @3xl:block flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="hidden shrink-0">COD</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <FormLabel
                      key="checkbox-0"
                      className="border-0 p-0 @3xl:rounded-md @3xl:border @3xl:p-4 @3xl:space-x-2 w-full flex items-start has-[[data-state=checked]]:border-primary"
                      htmlFor="payment-method"
                    >
                      <Checkbox
                        id="payment-method"
                        className=""
                        {...field}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <FormLabel>COD</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Cash On Delivery
                        </p>
                      </div>
                    </FormLabel>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          /> */}

            <div
              key="text-4"
              id="text-4"
              className=" col-span-12 @3xl:col-span-12 col-start-auto"
            >
              <p className="not-first:mt-6 text-xl font-medium">Shipping Address</p>
            </div>

            {/* <FormField
            control={form.control}
            name="checkbox-1"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="hidden shrink-0">
                  Same as Shipping Address
                </FormLabel>

                <div className="w-full">
                  <FormControl>
                    <FormLabel
                      key="checkbox-1"
                      className="border-0 p-0 @3xl:rounded-md @3xl:border @3xl:p-4 @3xl:space-x-2 w-full flex items-start has-[[data-state=checked]]:border-primary"
                      htmlFor="checkbox-1"
                    >
                      <Checkbox
                        id="checkbox-1"
                        className=""
                        {...field}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <FormLabel>Same as Shipping Address</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Checkbox Description
                        </p>
                      </div>
                    </FormLabel>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          /> */}

            {/* <div className="w-full">
            <Button
              key="submit-button-0"
              className="w-full"
              type="submit"
              variant="default"
            >
              Place Order
            </Button>
          </div> */}
          </div>
        </form>
      </Form>
    );
  }
);

export default CheckoutForm;
